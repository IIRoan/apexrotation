import { motion } from "framer-motion"

const AnimatedDigit = ({ digit }: { digit: string }) => (
  <motion.span
    key={digit}
    initial={{ opacity: 0.8 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.15 }}
  >
    {digit}
  </motion.span>
)

export default AnimatedDigit
