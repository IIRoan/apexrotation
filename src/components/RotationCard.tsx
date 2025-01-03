"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Timer, ArrowRight } from 'lucide-react'
import type { RotationCardProps } from './types'
import MapTimer from './MapTimer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useModeColors } from '@/hooks/useModeColors'

type RotationMode = 'ranked' | 'normal' | 'ltm'

interface ExtendedRotationCardProps extends RotationCardProps {
  mode: RotationMode
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

const RotationCard: React.FC<ExtendedRotationCardProps> = ({
  current,
  next,
  type,
  mode,
  showEventName = false,
  onHoverStart,
  onHoverEnd
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const colors = useModeColors(mode)
  
  return (
    <motion.div
      initial={{ opacity: 0, flex: 1 }}
      animate={{ opacity: 1 }}
      whileHover={!isMobile ? {
        flex: 1.5,
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }
      } : undefined}
      onHoverStart={!isMobile ? onHoverStart : undefined}
      onHoverEnd={!isMobile ? onHoverEnd : undefined}
      className="group relative min-w-0 flex flex-col justify-between rounded-xl overflow-hidden
                 h-[55vh] 
                 p-4 sm:p-8 lg:p-16"
    >
      {/* Accent Bar */}
      <div className={`absolute top-0 ${colors.position} w-1 sm:w-2 h-full flex`}>
        <div className={`h-full w-full ${colors.accent} opacity-20 shadow-[0_0_15px] shadow-current`} />
      </div>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`${colors.text} text-sm sm:text-base font-medium uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full ${colors.badge}`}>
            {type}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
        >
          {current.map}
        </motion.h1>

        {showEventName && current.eventName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`inline-block ${colors.badge} px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg`}
          >
            <span className={`${colors.text} text-base sm:text-xl`}>
              {current.eventName}
            </span>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 sm:gap-6"
      >
        <Timer className={`h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${colors.text}`} />
        <span className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          <MapTimer
            rotation={current}
            colorClass={colors.text}
          />
        </span>
      </motion.div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="space-y-1 sm:space-y-2">
            <span className={`block ${colors.textMuted} text-sm sm:text-base uppercase tracking-wider`}>
              Next Map
            </span>
            <span className="block text-white/90 text-lg sm:text-xl lg:text-2xl font-medium">
              {next.map}
            </span>
          </div>
          <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${colors.text}`} />
        </div>

        <div className={`relative h-1 sm:h-1.5 ${colors.progressBg} rounded-full overflow-hidden`}>
          <motion.div
            className={`absolute top-0 left-0 h-full ${colors.progressFill}`}
            initial={{ width: '100%' }}
            animate={{ width: `${((current.remainingSecs || 0) / current.DurationInSecs) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default RotationCard