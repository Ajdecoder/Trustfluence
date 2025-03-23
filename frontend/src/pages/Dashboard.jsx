import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Dashboard() {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/rate_influencer", {
        video_id: youtubeURL,
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar
            placeholder="Enter YouTube video/channel URL"
            onSearch={(query) => {
              setYoutubeURL(query);
              fetchData();
            }}
            isLoading={loading}
          />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-4 flex items-center gap-3 rounded-lg bg-red-500/30 p-4 text-red-200 backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 space-y-8"
          >
            <div className="text-center">
              <motion.div className="h-8 bg-gray-800 rounded-full w-64 mx-auto mb-4" />
              <motion.div className="h-4 bg-gray-800 rounded-full w-96 mx-auto" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm border border-gray-700/50"
                >
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-700/50 rounded-full w-3/4" />
                    <div className="h-10 bg-gray-700/50 rounded-xl w-full" />
                    <div className="h-4 bg-gray-700/50 rounded-full w-1/2" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!data && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-24 text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mx-auto w-48 h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"
              />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Influencer Analyzer
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get comprehensive analytics on any YouTube influencer. Enter a video or channel URL to analyze content quality, credibility score, fraud detection, and overall rating.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {['📈 Content Quality', '🛡️ Credibility', '🔍 Fraud Detection'].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-400/30 transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                  <p className="text-gray-400 text-sm">
                    {feature === '📈 Content Quality' && 'Detailed analysis of video content quality and engagement'}
                    {feature === '🛡️ Credibility' && 'Evaluate creator credibility and audience trust metrics'}
                    {feature === '🔍 Fraud Detection' && 'Advanced detection of suspicious activity and fake engagement'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-8"
          >
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent"
              >
                Influencer Analysis
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-gray-400"
              >
                {youtubeURL}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Content Score", value: data.content_score, color: "from-blue-500 to-blue-600" },
                { title: "Credibility Score", value: data.credibility_score, color: "from-green-500 to-green-600" },
                { title: "Fraud Score", value: data.fraud_score, color: data.fraud_score > 0.7 ? "from-red-500 to-red-600" : "from-yellow-500 to-yellow-600" },
                { title: "Rating", value: data.rating, color: "from-purple-500 to-purple-600" },
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
                  style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                  data-color={metric.color}
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white/90">{metric.title}</h3>
                    <p className={`mt-4 text-3xl font-bold ${metric.title === 'Fraud Score' && metric.value > 0.7 ? 'text-red-100' : 'text-white'}`}>
                      {typeof metric.value === 'number' ? metric.value.toFixed(2) : metric.value}
                    </p>
                    {metric.title === 'Fraud Score' && metric.value > 0.7 && (
                      <div className="mt-2 flex items-center gap-2 text-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-sm">High Risk</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {data.fraud_score > 0.7 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto flex max-w-md items-center gap-4 rounded-xl border border-red-500/30 bg-red-500/20 p-4 backdrop-blur-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-red-100">⚠️ Warning: This influencer shows signs of suspicious activity. Proceed with caution.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}