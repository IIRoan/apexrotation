import { useEffect, useState } from "react"
import type { MapRotation } from './types'
import AnimatedDigit from './AnimatedDigit'


const MapTimer = ({ rotation }: { rotation: MapRotation }) => {
  const [timeRemaining, setTimeRemaining] = useState(rotation.remainingSecs || 0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
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
    <div className="font-mono text-3xl font-bold tracking-wider text-[#8fbc8f]/90">
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
