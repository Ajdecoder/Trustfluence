export default function SpamScoreCard({ score }) {
    const scoreColor = score > 70 ? "text-red-500" : score > 40 ? "text-yellow-500" : "text-green-500";
  
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <h2 className="text-xl">Spam Score</h2>
        <p className={`text-3xl font-bold ${scoreColor}`}>{score}%</p>
      </div>
    );
  }
  