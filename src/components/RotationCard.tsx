"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Timer, ArrowRight } from 'lucide-react'
import type { RotationCardProps } from './types'
import MapTimer from './MapTimer'

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
  const getModeColors = (mode: RotationMode) => {
    switch (mode) {
      case 'ranked':
        return {
          text: 'text-purple-400',
          textMuted: 'text-purple-400/70',
          border: 'border-purple-400/20',
          badge: 'bg-purple-400/10',
          progressBg: 'bg-purple-400/10',
          progressFill: 'bg-purple-400',
          accent: 'bg-purple-400',
          position: 'right-0 rounded-l-full'
        }
      case 'normal':
        return {
          text: 'text-emerald-400',
          textMuted: 'text-emerald-400/70',
          border: 'border-emerald-400/20',
          badge: 'bg-emerald-400/10',
          progressBg: 'bg-emerald-400/10',
          progressFill: 'bg-emerald-400',
          accent: 'bg-emerald-400',
          position: 'left-0 rounded-r-full'
        }
      case 'ltm':
        return {
          text: 'text-yellow-400',
          textMuted: 'text-yellow-400/70',
          border: 'border-yellow-400/20',
          badge: 'bg-yellow-400/10',
          progressBg: 'bg-yellow-400/10',
          progressFill: 'bg-yellow-400',
          accent: 'bg-yellow-400',
          position: 'left-0 rounded-r-full'
        }
    }
  }

  const colors = getModeColors(mode)

  return (
    <motion.div
      initial={{ opacity: 0, flex: 1 }}
      animate={{ opacity: 1 }}
      whileHover={{
        flex: 1.5,
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative min-w-0 h-[55vh] flex flex-col justify-between p-16 rounded-xl overflow-hidden"
    >
      {/* Accent Bar */}
      <div className={`absolute top-0 ${colors.position} w-2 h-full flex`}>
        <div className={`h-full w-full ${colors.accent} opacity-20 shadow-[0_0_15px] shadow-current`} />
      </div>

      {/* Rest of the component remains unchanged */}
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`${colors.text} text-base font-medium uppercase tracking-wider px-5 py-2.5 rounded-full ${colors.badge}`}>
            {type}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl font-bold text-white tracking-tight"
        >
          {current.map}
        </motion.h1>

        {showEventName && current.eventName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`inline-block ${colors.badge} px-5 py-2.5 rounded-lg`}
          >
            <span className={`${colors.text} text-xl`}>
              {current.eventName}
            </span>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-6"
      >
        <Timer className={`h-10 w-10 ${colors.text}`} />
        <span className="font-mono text-6xl font-bold tracking-tight text-white">
          <MapTimer
            rotation={current}
            colorClass={colors.text}
          />
        </span>
      </motion.div>

      <div className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="space-y-2">
            <span className={`block ${colors.textMuted} text-base uppercase tracking-wider`}>
              Next Map
            </span>
            <span className="block text-white/90 text-2xl font-medium">
              {next.map}
            </span>
          </div>
          <ArrowRight className={`h-6 w-6 ${colors.text}`} />
        </div>

        <div className={`relative h-1.5 ${colors.progressBg} rounded-full overflow-hidden`}>
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