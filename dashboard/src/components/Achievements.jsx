import React from 'react';

const Achievements = () => {
  return (
    <div className="h-[250px] w-[450px] bg-gradient-to-r from-green-300 to-teal-500 text-white p-6 rounded-xl shadow-lg mb-4">
      
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Badges Earned</h3>
        <div className="flex justify-start gap-6 flex-wrap">
          {/* Badge 1 */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-full flex items-center justify-center p-2 shadow-lg">
              <span className="text-lg font-semibold">🏅</span>
            </div>
            <span className="text-sm text-gray-700">1 Hour Logged</span>
          </div>
          
          {/* Badge 2 */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-600 text-white rounded-full flex items-center justify-center p-2 shadow-lg">
              <span className="text-lg font-semibold">🔥</span>
            </div>
            <span className="text-sm text-gray-700">3-Day Streak</span>
          </div>
          
          {/* Badge 3 */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-600 text-white rounded-full flex items-center justify-center p-2 shadow-lg">
              <span className="text-lg font-semibold">🎯</span>
            </div>
            <span className="text-sm text-gray-700">Goal Reached</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
