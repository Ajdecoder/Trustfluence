import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const extractVideoId = (url) => {
  const trimmedUrl = url.trim();
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmedUrl.match(regex);
  return match && match[2].length === 11 ? match[2] : trimmedUrl;
};

export default function SearchBar({ onSearch, isLoading }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(input);
    if (videoId) {
      onSearch(videoId);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="relative">
        <motion.div
          animate={{
            borderColor: isFocused ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isFocused ? '0 0 20px rgba(59, 130, 246, 0.2)' : 'none'
          }}
          className="flex items-center gap-2 p-1 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50"
        >
          <div className="pl-4 text-gray-400">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </div>
          
          <input
            type="text"
            placeholder="Enter YouTube URL"
            className="w-full px-4 py-5 bg-transparent text-white focus:outline-none placeholder-gray-400 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 mr-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold transition-all"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <span>Analyze</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: 2 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.div>
              </>
            )}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: input.length > 0 ? 1 : 0,
            y: input.length > 0 ? 0 : -10
          }}
          className="absolute right-4 top-full mt-2 text-sm text-gray-400"
        >
          Press Enter to search
        </motion.div>
      </div>
    </motion.form>
  );
}