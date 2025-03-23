import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import SpamScoreCard from "./SpamScoreCard";
import EngagementCard from "./EngagementCard";
import GrowthChart from "./GrowthChart";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({
    user: null,
    posts: [],
    likes: 0,
    comments: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [userRes, postsRes, likesRes, commentsRes] = await Promise.all([
        axios.get(`http://localhost:3000/user-details?username=${username}`),
        axios.get(`http://localhost:3000/posts`),
        axios.get(`http://localhost:3000/total-likes`),
        axios.get(`http://localhost:3000/comments`),
      ]);

      setData({
        user: userRes.data.data,
        posts: postsRes.data.posts,
        likes: likesRes.data.total_likes,
        comments: commentsRes.data.comments,
      });

    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch data");
      console.error("API Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    if (!data.user) return {};

    const engagementRate = 
      ((data.likes + data.comments.length) / data.user.followers) * 100;
    
    const spamScore = Math.min(
      100,
      Math.max(
        0,
        30 * (1 - engagementRate / 5) +
        40 * ((data.likes / data.user.followers) * 50) + // Adjusted calculation
        30 * (data.comments.length / 1000)
      )
    );

    return {
      engagementRate: engagementRate.toFixed(2),
      spamScore: spamScore.toFixed(1),
      followers: data.user.followers,
      postsCount: data.posts.length,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <SearchBar
        onSearch={(query) => {
          setUsername(query);
          fetchData();
        }}
      />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 mb-4 bg-red-900/20 text-red-400 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 mb-4 text-gray-400 text-center"
        >
          Analyzing @{username}...
        </motion.div>
      )}

      {data.user && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Profile Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              {data.user.full_name}
              {data.user.verified && (
                <span className="ml-2 text-blue-400">✓</span>
              )}
            </h1>
            <p className="text-gray-400">@{data.user.username}</p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-blue-400">{data.user.posts_count}</span> Posts
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-green-400">{data.user.followers}</span> Followers
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-purple-400">{data.user.following}</span> Following
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SpamScoreCard score={metrics.spamScore} />
            <EngagementCard engagementRate={metrics.engagementRate} />
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gray-800 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-2">Engagement Summary</h3>
              <div className="space-y-2">
                <p>Total Likes: <span className="text-blue-400">{data.likes}</span></p>
                <p>Total Comments: <span className="text-green-400">{data.comments.length}</span></p>
                <p>Posts Analyzed: <span className="text-purple-400">{data.posts.length}</span></p>
              </div>
            </motion.div>
          </div>

          {/* Content Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent Posts */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gray-800 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
              {data.posts.slice(0, 5).map((post, index) => (
                <div key={index} className="p-4 mb-2 bg-gray-700 rounded-lg">
                  <p className="truncate">Post {index + 1}: {post.postText}</p>
                </div>
              ))}
            </motion.div>

            {/* Recent Comments */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gray-800 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-4">Recent Comments</h3>
              {data.comments.slice(0, 5).map((comment, index) => (
                <div key={index} className="p-4 mb-2 bg-gray-700 rounded-lg">
                  <p className="font-medium text-blue-300">{comment.user}</p>
                  <p className="text-gray-400 truncate">{comment.text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Growth Chart */}
          <div className="mt-8">
            <GrowthChart
              data={[
                { date: "Last Week", followers: data.user.followers - 150 },
                { date: "Current", followers: data.user.followers },
              ]}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}