export interface MapRotation {
  start: number;
  end: number;
  readableDate_start: string;
  readableDate_end: string;
  map: string;
  code: string;
  DurationInSecs: number;
  DurationInMinutes: number;
  asset: string; // URL for the map image
  remainingSecs?: number; 
  remainingMins?: number;
  remainingTimer?: string; 
  eventName?: string; 
  isActive?: boolean; 
}

export interface RotationData {
  battle_royale: {
    current: MapRotation;
    next: MapRotation;
  };
  ranked: {
    current: MapRotation;
    next: MapRotation;
  };
  ltm?: { 
    current: MapRotation & { eventName: string }; 
    next: MapRotation & { eventName: string };
  };
}

export interface RotationCardProps {
  current: MapRotation; // Current map data
  next: MapRotation; // Next map data
  type: string; // Display name for the mode (e.g., "Ranked", "Battle Royale")
  showEventName?: boolean; // Flag to display event name (for LTMs)
  className?: string; // Allow passing additional CSS classes
}
