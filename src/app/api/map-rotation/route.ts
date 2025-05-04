import { NextResponse } from 'next/server';
import PostHogClient from '@/lib/posthog';

export async function GET() {
  const posthog = PostHogClient();
  const apiKey = process.env.AL_API_KEY;
  const distinctId = 'system:api:map-rotation'; 

  if (!apiKey) {
    const errorMsg = "Server configuration error: AL_API_KEY is missing.";
    console.error(errorMsg);
    posthog.capture({
      distinctId: distinctId,
      event: 'api_error_config',
      properties: { 
        route: '/api/map-rotation',
        error_message: errorMsg,
      }
    });
    return NextResponse.json(
      { error: "Server Configuration Error", message: "Required API key is not configured." },
      { status: 500 }
    );
  }

  let response: Response | null = null;

  try {

    response = await fetch(
      `https://api.mozambiquehe.re/maprotation?version=2&auth=${apiKey}`,
      { 
        next: { revalidate: 60 }, 
        headers: {
          'User-Agent': 'ApexRotationApp/1.5 (https://apex.roan.dev)'
        },
        signal: AbortSignal.timeout(10000) 
      }
    );
    
    if (!response.ok) {
      const status = response.status;
      let errorBody: any = "Could not read error body";
      let errorText = "";
      try {
        errorText = await response.text(); 
        errorBody = JSON.parse(errorText);
      } catch (e) {
        errorBody = errorText || "Empty error response body"; 
      }

      const errorMsg = `External API Error: Status ${status}`;
      console.error(errorMsg, errorBody);
      posthog.capture({
        distinctId: distinctId,
        event: 'api_error_external',
        properties: {
          route: '/api/map-rotation',
          error_message: errorMsg,
          external_status_code: status,
          external_error_body: typeof errorBody === 'string' ? errorBody.substring(0, 500) : errorBody,
        }
      });

      let userMessage = `Failed to fetch data from Apex Legends API (Status: ${status}).`;
       if (status === 401 || status === 403) userMessage = "Authentication failed with Apex Legends API.";
       else if (status === 429) userMessage = "Rate limited by Apex Legends API. Please try again shortly.";
       else if (status === 406) userMessage = "Incompatible request format for Apex Legends API."; 
       else if (status >= 500) userMessage = "Apex Legends API is currently unavailable. Please try again later.";

      return NextResponse.json(
        { error: "External API Error", message: userMessage },
        { status: status } 
      );
    }
    
    const data = await response.json();

    if (!data?.battle_royale?.current || !data?.ranked?.current) {
        const errorMsg = "Invalid data structure received from external API.";
        console.error(errorMsg, JSON.stringify(data).substring(0, 500)); 
        posthog.capture({
            distinctId: distinctId,
            event: 'api_error_data_structure',
            properties: {
                route: '/api/map-rotation',
                error_message: errorMsg,
                received_data_sample: JSON.stringify(data).substring(0, 200), 
            }
        });
        return NextResponse.json(
            { error: "Data Processing Error", message: "Received unexpected data format." },
            { status: 500 }
        );
    }

    return NextResponse.json(data);

  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'TimeoutError';
    const errorMsg = error instanceof Error ? error.message : "Unknown fetch error";
    const errorType = isTimeout ? 'Fetch Timeout' : 'Fetch/Network Error';
    const statusCode = isTimeout ? 504 : 503;

    console.error(`${errorType}:`, error);
    posthog.capture({
      distinctId: distinctId,
      event: 'api_error_fetch',
      properties: {
        route: '/api/map-rotation',
        error_type: errorType,
        error_message: errorMsg,
        error_details: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack?.substring(0, 500) } : error,
      }
    });

    return NextResponse.json(
      { error: "Service Error", message: isTimeout ? "Request timed out." : "Failed to connect to external service." },
      { status: statusCode }
    );
  } finally {
  }
}
