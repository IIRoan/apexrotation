export interface MapRotation {
    start: number
    end: number
    readableDate_start: string
    readableDate_end: string
    map: string
    code: string
    DurationInSecs: number
    DurationInMinutes: number
    asset: string
    remainingSecs?: number
    remainingMins?: number
    remainingTimer?: string
    eventName?: string
    isActive?: boolean
  }
  
  export interface RotationData {
    battle_royale: {
      current: MapRotation
      next: MapRotation
    }
    ranked: {
      current: MapRotation
      next: MapRotation
    }
    ltm: {
      current: MapRotation & { eventName: string }
      next: MapRotation & { eventName: string }
    }
  }
  
export interface RotationCardProps {
  current: MapRotation;
  next: MapRotation;
  type: string;
  showEventName?: boolean;
}
  