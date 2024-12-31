import React from 'react';
import { motion } from "framer-motion";
import { GaugeCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LTMButtonProps {
  showLTM: boolean;
  onClick: () => void;
  className?: string;
}

const LTMButton: React.FC<LTMButtonProps> = ({ 
  showLTM, 
  onClick,
  className 
}) => {
  return (
    <motion.div
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="outline"
        onClick={onClick}
        className={cn(
          "relative overflow-hidden",
          "px-6 py-2.5 h-auto rounded-lg",
          "border border-[#8fbc8f]/20",
          "bg-gradient-to-r from-black/40 to-black/20",
          "hover:border-[#8fbc8f]/40 hover:from-black/50 hover:to-black/30",
          "transition-all duration-300",
          "flex items-center gap-2.5",
          className
        )}
      >
        <motion.div
          animate={{
            rotate: showLTM ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        >
          <GaugeCircle className="w-4 h-4 text-[#8fbc8f]" />
        </motion.div>

        <span className="text-[#8fbc8f] font-medium">
          {showLTM ? 'Hide LTM' : 'Show LTM'}
        </span>

        {/* Animated border highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: showLTM ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-lg border-2 border-[#8fbc8f]/20" />
        </motion.div>

        {/* Background pulse effect on state change */}
        <motion.div
          className="absolute inset-0 bg-[#8fbc8f]/5 pointer-events-none"
          initial={false}
          animate={{
            scale: showLTM ? [1, 1.5, 1] : [1, 1.5, 1],
            opacity: [0.3, 0, 0]
          }}
          transition={{
            duration: 0.5,
            times: [0, 0.5, 1]
          }}
          key={showLTM ? 'show' : 'hide'}
        />
      </Button>
    </motion.div>
  );
};

export default LTMButton;