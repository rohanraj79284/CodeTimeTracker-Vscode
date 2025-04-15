import React from 'react';
import dayjs from 'dayjs';

const generateDummyData = (days = 49) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = dayjs().subtract(days - 1 - i, 'day');
    const minutes = Math.floor(Math.random() * 120);
    data.push({ date, minutes });
  }
  return data;
};

const getColor = (minutes) => {
  if (minutes > 90) return 'bg-green-600';
  if (minutes > 60) return 'bg-green-400';
  if (minutes > 30) return 'bg-green-200';
  if (minutes > 0) return 'bg-green-100';
  return 'bg-gray-200';
};

const CodingActivityTracker = ({ days = 49 }) => {
  const data = generateDummyData(days);
  const weeks = Math.ceil(days / 7);
  const weekData = Array.from({ length: weeks }, (_, i) =>
    data.slice(i * 7, i * 7 + 7)
  );

  // Streak calculation
  let currentStreak = 0;
  let longestStreak = 0;
  let ongoing = true;

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].minutes > 0) {
      currentStreak++;
    } else {
      if (ongoing) {
        ongoing = false;
      } else {
        break;
      }
    }
  }

  // Longest streak
  let tempStreak = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].minutes > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return (
    <div className="h-[250px] w-[450px] bg-white p-4 rounded-xl shadow-lg flex flex-col mb-4">
      <h2 className="text-xl font-semibold mb-4">🔥 Coding Activity Tracker</h2>
      <div className="flex flex-row gap-4 flex-grow">
      {/* Heatmap */}
      <div className='flex-1'>
      <div className="flex flex-col items-start mb-4">
        <div className="flex space-x-[6px] mb-1 ml-[30px]">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, i) => (
            <div key={i} className="w-4 text-[11px] text-gray-500 text-center">
              {label}
            </div>
          ))}
        </div>

        <div className="flex space-x-[6px] mb-1 ml-[30px]">
          {weekData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-[6px]">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-4 h-4 rounded-sm ${getColor(day?.minutes)}`}
                  title={`${day?.date.format('MMM DD')}: ${day?.minutes || 0} min`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      </div>
      {/* Streak Card */}
      <div className='flex-2'>
      <div className="flex items-center justify-between mt-2 bg-orange-100 p-8 rounded-lg shadow-inner">
        <div>
          <h3 className="text-md font-semibold mb-1">🔥 Streak Tracker</h3>
          <p className="text-sm text-gray-700">
            Current Streak: <span className="font-bold">{currentStreak} days</span>
          </p>
          <p className="text-sm text-gray-700">
            Longest Streak: <span className="font-bold">{longestStreak} days</span>
          </p>
        </div>

        
      </div>
    </div>
    </div>
    </div>
  );
};

export default CodingActivityTracker;
