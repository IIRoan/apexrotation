import React from 'react';
import { motion } from "framer-motion";
import { Timer, ArrowRight, Clock } from 'lucide-react';
import type { RotationCardProps } from './types';
import MapTimer from './MapTimer';

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const RotationCard: React.FC<RotationCardProps> = ({ current, next, type, showEventName = false }) => (
  <div className="relative flex-1 min-w-[280px] min-h-[400px] sm:min-h-[500px] overflow-hidden rounded-3xl">
    <div className="h-full p-4 sm:p-6 md:p-10 flex flex-col">
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.1 }}
        className="flex-1 flex flex-col justify-between gap-6 sm:gap-12"
      >
        {/* Header Section */}
        <div className="space-y-4 sm:space-y-6 flex-1 flex flex-col justify-center items-center text-center">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg font-medium text-[#8fbc8f]/80 tracking-wide"
          >
            {type}
          </motion.div>
          <motion.h3
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
          >
            {current.map}
          </motion.h3>
          {showEventName && current.eventName && (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-[#8fbc8f]/70 mt-2 sm:mt-4"
            >
              {current.eventName}
            </motion.div>
          )}
        </div>

        {/* Timer Section */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="space-y-4 sm:space-y-8 bg-black/65 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5"
        >
          {/* Timer and Next Map Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            {/* Current Timer */}
            <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
              <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-[#8fbc8f]" />
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#8fbc8f]/90">
                <MapTimer rotation={current} />
              </div>
            </div>

            {/* Next Map Indicator */}
            <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-3">
              <div className="flex flex-col items-end">
                <span className="text-xs sm:text-sm font-medium text-[#8fbc8f]/60">Next Map</span>
                <span className="text-base sm:text-xl font-medium text-white/80">{next.map}</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#8fbc8f]/70" />
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-[#8fbc8f]/50 mt-1" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#8fbc8f]/60"
              initial={{ width: '100%' }}
              animate={{ width: `${((current.remainingSecs || 0) / current.DurationInSecs) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default RotationCard;
