import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

const influencerList = [
  { name: "John Doe", followers: "100K" },
  { name: "Jane Smith", followers: "250K" },
];

const InfluencerList = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
    >
      {influencerList.map((influencer, index) => (
        <AnimatedCard key={index} influencer={influencer} />
      ))}
    </motion.div>
  );
};

export default InfluencerList;
