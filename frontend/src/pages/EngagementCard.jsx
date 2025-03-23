export default function EngagementCard({ engagementRate }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <h2 className="text-xl">Engagement Rate</h2>
        <p className="text-3xl font-bold">{engagementRate}%</p>
      </div>
    );
  }
  