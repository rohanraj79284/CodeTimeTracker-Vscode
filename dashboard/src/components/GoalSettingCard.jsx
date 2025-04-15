import React, { useState } from 'react';

const GoalSettingCard = () => {
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleAddGoal = () => {
    // Placeholder for add goal logic
    console.log({ task, startDate, endDate, hoursPerDay });
  };

  return (
    <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 text-gray-800 p-6 rounded-xl shadow-lg h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Set a Goal</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Task / Project</label>
        <input
          type="text"
          className="w-full p-2 rounded border border-gray-300"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
    
      <div className="mb-4">
        <label className="block mb-1 font-medium">Number of Days</label>
        <input
          type="number"
          className="w-full p-2 rounded border border-gray-300"   
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Hours per Day</label>
        <input
          type="number"
          className="w-full p-2 rounded border border-gray-300"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddGoal}
        className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
      >
        Add Goal
      </button>
    </div>
  );
};

export default GoalSettingCard;