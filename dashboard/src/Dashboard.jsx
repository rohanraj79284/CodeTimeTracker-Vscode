import React from 'react';
import TotalTimeCard from './components/TotalTimeCard';
import CodingActivityTracker from './components/CodingActivityTracker';
import ProjectBreakdown from './components/ProjectBreakdown';
import GoalSettingCard from './components/GoalSettingCard';
import Achievements from './components/Achievements';

const Dashboard = () => {
  return (
    <div className="bg-blue-100 p-4 overflow-hidden">
      <div className="grid grid-rows-2-[300px_700px] grid-cols-3 gap-1">
        {/* Row 1: Total Time, Achievements, Coding Tracker */}
        <div className="col-span-1 overflow-auto ">
          <TotalTimeCard />
        </div>
        <div className="col-span-1 overflow-auto">
          <Achievements />
        </div>
        <div className="col-span-1 overflow-auto">
          <CodingActivityTracker />
        </div>

        {/* Row 2: Project Breakdown (2 cols), Goal Setting (1 col) */}
        <div className="col-span-2 overflow-auto">
          <ProjectBreakdown />
        </div>
        <div className="col-span-1 overflow-auto">
          <GoalSettingCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
