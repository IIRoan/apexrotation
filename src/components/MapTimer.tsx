import { useEffect, useState, useCallback } from "react"
import type { MapRotation } from './types'
import AnimatedDigit from './AnimatedDigit'

interface MapTimerProps {
  rotation: MapRotation;
  colorClass?: string;
}

interface FormattedTime {
  hours?: string;
  minutes: string;
  seconds: string;
}

const MapTimer = ({ rotation, colorClass = 'text-emerald-400/90' }: MapTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(rotation.remainingSecs || 0)

  const handleTimerEnd = useCallback(() => {
    // Reload the entire page
    window.location.reload()
  }, [])

  useEffect(() => {
    // Reset timer when rotation changes
    setTimeRemaining(rotation.remainingSecs || 0)
   
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          handleTimerEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup interval on unmount or rotation change
    return () => clearInterval(timer)
  }, [rotation.remainingSecs, handleTimerEnd])

  const formatTime = (seconds: number): FormattedTime => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
   
    if (hours > 0) {
      return {
        hours: hours.toString().padStart(2, '0'),
        minutes: mins.toString().padStart(2, '0'),
        seconds: secs.toString().padStart(2, '0')
      }
    }
   
    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    }
  }

  const time = formatTime(timeRemaining)

  return (
    <div className={`font-mono text-3xl font-bold tracking-wider ${colorClass}`}>
      {time.hours && (
        <>
          <AnimatedDigit digit={time.hours[0]} />
          <AnimatedDigit digit={time.hours[1]} />
          <span className="opacity-50">:</span>
        </>
      )}
      <AnimatedDigit digit={time.minutes[0]} />
      <AnimatedDigit digit={time.minutes[1]} />
      <span className="opacity-50">:</span>
      <AnimatedDigit digit={time.seconds[0]} />
      <AnimatedDigit digit={time.seconds[1]} />
    </div>
  )
}

export default MapTimer