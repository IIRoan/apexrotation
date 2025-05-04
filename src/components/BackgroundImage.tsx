import { motion } from "framer-motion";
import type { FC, ReactNode } from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  side: 'left' | 'right';
  isHovered: boolean;
  otherSideHovered: boolean;
  children?: ReactNode;
}

const Separator: FC<{hoveredSide: 'left' | 'right' | null}> = ({ hoveredSide }) => (
  <motion.div 
    className="absolute top-0 -translate-x-1/2 w-px h-full bg-white/10 z-20 pointer-events-none" 
    animate={{
      left: hoveredSide === 'right' ? '40%' : 
            hoveredSide === 'left' ? '60%' : '50%'
    }}
    transition={{
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }}
  />
);

const BackgroundImage: FC<BackgroundImageProps> = ({
  imageUrl,
  side,
  isHovered,
  otherSideHovered,
  children
}) => {
  const width = isHovered ? '60%' : otherSideHovered ? '40%' : '50%';
  
  return (
    <>
      <motion.div
        key={imageUrl} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, width }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{
          right: side === 'left' ? 'auto' : 0,
          left: side === 'left' ? 0 : 'auto',
        }}
      >
        {/* Container for image and overlays */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Image Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${imageUrl})`,
              // Flip image horizontally if it's on the right side
              transform: side === 'right' ? 'scaleX(-1)' : 'none', 
            }}
          />
          {/* Overlay Layers */}
          <div className="absolute inset-0 mix-blend-multiply bg-slate-900/18 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/15 z-10" />
        </div>
        
        {/* Optional Children Content */}
        {children && (
          <div className="relative z-20 p-4"> 
            <div className="text-shadow backdrop-blur-sm bg-black/20 p-2 rounded">
              {children}
            </div>
          </div>
        )}
      </motion.div>
      {/* Render separator only once (e.g., attached to the left image) */}
      {side === 'left' && <Separator hoveredSide={isHovered ? 'left' : otherSideHovered ? 'right' : null} />}
    </>
  );
};

export default BackgroundImage;
