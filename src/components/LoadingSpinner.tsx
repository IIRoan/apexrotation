import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  loadingText?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loadingText = 'Loading...',
  size = 96
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <motion.div 
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-emerald-400/10"
          style={{
            borderTopColor: 'rgba(52, 211, 153, 0.8)',
            borderRightColor: 'rgba(52, 211, 153, 0.4)',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-emerald-400/20"
          style={{
            borderTopColor: 'rgba(52, 211, 153, 0.6)',
            borderLeftColor: 'rgba(52, 211, 153, 0.3)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
      
      <motion.p
        className="mt-6 text-xl font-bold text-emerald-400/70"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {loadingText}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;