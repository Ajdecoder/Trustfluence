import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GrowthChart({ data }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg m-3">
      <h2 className="text-xl text-white">Follower Growth Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ddd" />
          <YAxis stroke="#ddd" />
          <Tooltip />
          <Line type="monotone" dataKey="followers" stroke="#007AFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
