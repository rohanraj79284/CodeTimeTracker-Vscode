import React from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

const TotalTimeCard = ({ totalMinutes = 125, dailyGoalMinutes = 240 }) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const progress = Math.min((totalMinutes / dailyGoalMinutes) * 100, 100);

  return (
    <motion.div
      className="bg-gradient-to-r from-blue-200 to-purple-300 text-white p-6 rounded-xl shadow-lg h-[250px] w-[450px] mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <Clock className="text-indigo-600 w-6 h-6" />
        <h2 className="text-xl font-semibold text-gray-700">Total Time Coded Today</h2>
      </div>

      <p className="text-4xl font-bold text-indigo-600">
        {hours}h {minutes}m
      </p>
      <p className="text-sm text-gray-400 mt-1">Keep up the grind 🔥</p>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-1">Daily Goal: {Math.floor(dailyGoalMinutes / 60)}h</p>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{Math.round(progress)}% of your goal</p>
      </div>
    </motion.div>
  );
};

export default TotalTimeCard;
