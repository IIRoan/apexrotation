import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface MobileDisclaimerProps {
  onProceed: () => void;
}

const MobileDisclaimer: React.FC<MobileDisclaimerProps> = ({ onProceed }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <motion.div 
        className="relative max-w-sm w-full px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-black/40 to-black/20 border border-emerald-400/20 p-8 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-emerald-400 text-lg font-medium mb-3">Disclaimer</h2>
          <p className="text-emerald-400/70 text-sm mb-6">
            This app is made for desktop viewing. Mobile access is available but will not look good.
          </p>
          
          <motion.button
            onClick={onProceed}
            className="group relative w-full overflow-hidden px-6 py-3 rounded-lg
                     border border-emerald-400/20 bg-gradient-to-r from-black/40 to-black/20
                     hover:border-emerald-400/40 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="flex items-center justify-center gap-2 text-emerald-400 font-medium">
              Continue 
              <ArrowRight className="w-4 h-4" />
            </span>

          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MobileDisclaimer;