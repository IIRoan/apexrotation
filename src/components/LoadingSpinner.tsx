import React from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image'; 

interface LoadingSpinnerProps {
  loadingText?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loadingText = 'Loading map data...',
  size = 96
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-center px-4">
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
        {/* Outer ring */}
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
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-emerald-400/20"
          style={{
            borderTopColor: 'rgba(52, 211, 153, 0.6)',
            borderLeftColor: 'rgba(52, 211, 153, 0.3)',
          }}
          animate={{ rotate: [360, 0] }} // Rotate opposite direction
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Centered Apex Logo using next/image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <NextImage 
            src="/apex.svg" 
            alt="Apex Legends Logo" 
            width={Math.floor(size / 2.5)} 
            height={Math.floor(size / 2.5)}
            className="opacity-70"
            priority 
          />
        </div>
      </motion.div>
      
      {/* Loading Text */}
      <motion.p
        className="mt-6 text-lg sm:text-xl font-medium text-emerald-400/70"
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.2,
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
