import { motion } from "framer-motion";

const AnimatedCard = ({ influencer }) => {
  return (
    <motion.div
      className="p-4 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold">{influencer.name}</h2>
      <p>{influencer.followers} followers</p>
    </motion.div>
  );
};

export default AnimatedCard;
