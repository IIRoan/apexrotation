import { motion } from "framer-motion";

const BackgroundImage = ({ imageUrl, side }: { imageUrl: string; side: 'left' | 'right' }) => (
  <motion.div
    key={imageUrl}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className={`absolute inset-0 ${side === 'left' ? 'right-1/2' : 'left-1/2'} bg-cover bg-center bg-no-repeat opacity-80`}
    style={{ 
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: '50% 50%',
      transform: side === 'right' ? 'scaleX(-1)' : 'none'
    }}
  />
);

export default BackgroundImage;
