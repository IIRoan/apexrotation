import { motion } from "framer-motion";

const BackgroundImage = ({ 
  imageUrl, 
  side, 
  isHovered,
  otherSideHovered 
}: { 
  imageUrl: string; 
  side: 'left' | 'right';
  isHovered: boolean;
  otherSideHovered: boolean;
}) => {
  const width = isHovered ? '60%' : otherSideHovered ? '40%' : '50%';
  
  return (
    <motion.div
      key={imageUrl}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        width,
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80`}
      style={{ 
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: '50% 50%',
        transform: side === 'right' ? 'scaleX(-1)' : 'none',
        right: side === 'left' ? 'auto' : 0,
        left: side === 'left' ? 0 : 'auto',
      }}
    />
  );
};

export default BackgroundImage;