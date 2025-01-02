import { motion } from "framer-motion";
import type { FC, ReactNode } from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  side: 'left' | 'right';
  isHovered: boolean;
  otherSideHovered: boolean;
  children?: ReactNode;
}

const BackgroundImage: FC<BackgroundImageProps> = ({
  imageUrl,
  side,
  isHovered,
  otherSideHovered,
  children
}) => {
  const width = isHovered ? '60%' : otherSideHovered ? '40%' : '50%';
 
  return (
    <motion.div
      key={imageUrl}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, width }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        right: side === 'left' ? 'auto' : 0,
        left: side === 'left' ? 0 : 'auto',
      }}
    >
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(to ${side === 'left' ? 'right' : 'left'},
              rgba(15, 23, 42, 0.25),
              rgba(15, 23, 42, 0.15)
            ),
            linear-gradient(to bottom,
              rgba(0, 0, 0, 0.2),
              rgba(0, 0, 0, 0.1)
            ),
            url(${imageUrl})
          `,
          backgroundPosition: '50% 50%',
          backgroundSize: 'cover',
          transform: side === 'right' ? 'scaleX(-1)' : 'none',
        }}
      />
      {children && (
        <div className="relative z-10 p-4">
          <div className="text-shadow backdrop-blur-sm bg-black/20 p-2 rounded">
            {children}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BackgroundImage;