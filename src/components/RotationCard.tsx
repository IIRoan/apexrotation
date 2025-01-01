import React from 'react';
import { motion } from "framer-motion";
import { Timer, ArrowRight } from 'lucide-react';
import type { RotationCardProps } from './types';
import MapTimer from './MapTimer';

type RotationMode = 'ranked' | 'normal' | 'ltm';

interface ExtendedRotationCardProps extends RotationCardProps {
  mode: RotationMode;
}
const RotationCard: React.FC<ExtendedRotationCardProps> = ({ current, next, type, mode, showEventName = false }) => {
  const getModeColors = (mode: RotationMode) => {
    switch (mode) {
      case 'ranked':
        return {
          accent: 'from-purple-400/20 via-purple-400/40 to-purple-400/20',
          text: 'text-purple-400',
          textMuted: 'text-purple-400/70',
          border: 'border-purple-400/20',
          badge: 'bg-purple-400/10',
          progressBg: 'bg-purple-400/10',
          progressFill: 'bg-gradient-to-r from-purple-400/60 to-purple-400/40'
        };
      case 'normal':
        return {
          accent: 'from-emerald-400/20 via-emerald-400/40 to-emerald-400/20',
          text: 'text-emerald-400',
          textMuted: 'text-emerald-400/70',
          border: 'border-emerald-400/20',
          badge: 'bg-emerald-400/10',
          progressBg: 'bg-emerald-400/10',
          progressFill: 'bg-gradient-to-r from-emerald-400/60 to-emerald-400/40'
        };
      case 'ltm':
        return {
          accent: 'from-yellow-400/20 via-yellow-400/40 to-yellow-400/20',
          text: 'text-yellow-400',
          textMuted: 'text-yellow-400/70',
          border: 'border-yellow-400/20',
          badge: 'bg-yellow-400/10',
          progressBg: 'bg-yellow-400/10',
          progressFill: 'bg-gradient-to-r from-yellow-400/60 to-yellow-400/40'
        };
    }
  };

  const colors = getModeColors(mode);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[600px] flex flex-col relative"
    >
      {/* Left Border Accent */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4/5 bg-gradient-to-b ${colors.accent}`} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-8 pt-12 space-y-20">
        {/* Header Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center"
          >
            <span className={`${colors.textMuted} text-sm font-medium uppercase tracking-wider px-4 py-2 border ${colors.border} rounded-full`}>
              {type}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-bold text-white tracking-tight"
          >
            {current.map}
          </motion.h1>

          {showEventName && current.eventName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`inline-block ${colors.badge} px-4 py-2 rounded-lg`}
            >
              <span className={`${colors.text} text-xl`}>
                {current.eventName}
              </span>
            </motion.div>
          )}
        </div>

        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <Timer className={`h-8 w-8 ${colors.textMuted}`} />
          <span className="font-mono text-6xl font-bold">
            <MapTimer
              rotation={current}
              colorClass={colors.text}
            />
          </span>
        </motion.div>

        {/* Next Map Section */}
        <div className="mt-auto space-y-6">
          <div className="flex items-center gap-6">
            <div className="space-y-2">
              <span className={`block ${colors.textMuted} text-sm uppercase tracking-wider`}>
                Next Map
              </span>
              <span className="block text-white/90 text-2xl font-medium">
                {next.map}
              </span>
            </div>
            <ArrowRight className={`h-5 w-5 ${colors.textMuted}`} />
          </div>

          {/* Progress Bar */}
          <div className={`relative h-1 ${colors.progressBg} rounded-full overflow-hidden`}>
            <motion.div
              className={`absolute top-0 left-0 h-full ${colors.progressFill}`}
              initial={{ width: '100%' }}
              animate={{ width: `${((current.remainingSecs || 0) / current.DurationInSecs) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RotationCard;