const { saveGoal, getGoals } = require('../storage/goalStorage');
const { getTimeSpent } = require('../tracker/timeStorage');

function addNewGoal({ projectName, startDate, endDate, hoursPerDay }) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiff = Math.abs(end - start);
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  const totalMinutes = totalDays * hoursPerDay * 60;

  const goal = {
    projectName,
    startDate,
    endDate,
    hoursPerDay,
    totalDays,
    totalMinutes,
    createdAt: new Date().toISOString()
  };

  saveGoal(goal);
  return goal;
}

function getAllGoals() {
  return getGoals();
}

function getGoalProgress(projectName) {
  const goals = getGoals();
  const goal = goals.find(g => g.projectName === projectName);
  if (!goal) return null;

  const minutesSpent = getTimeSpent(projectName);
  const progressPercent = ((minutesSpent / goal.totalMinutes) * 100).toFixed(2);

  return {
    ...goal,
    minutesSpent,
    progressPercent
  };
}

module.exports = {
  addNewGoal,
  getAllGoals,
  getGoalProgress
};
