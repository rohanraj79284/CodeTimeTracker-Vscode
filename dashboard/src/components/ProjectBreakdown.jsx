import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Portfolio", time: 120, goal: 180 },
  { name: "DSA", time: 60, goal: 120 },
  { name: "Blog", time: 30, goal: 60 },
];

const ProjectBreakdown = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-2 rounded-xl shadow-lg h-[400px]">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Project-wise Time Breakdown</h2>
      <ResponsiveContainer width="100%" height={345}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" fill="orange" name="Time Spent (min)" />
          <Bar dataKey="goal" fill="blue" name="Goal (min)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectBreakdown;

