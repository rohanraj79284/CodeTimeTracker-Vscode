const fs = require('fs');
const path = require('path');

const goalFilePath = path.join(__dirname, '../data/goals.json');

// Ensure the data folder exists
if (!fs.existsSync(path.dirname(goalFilePath))) {
  fs.mkdirSync(path.dirname(goalFilePath), { recursive: true });
}

function saveGoal(goal) {
  let goals = [];
  if (fs.existsSync(goalFilePath)) {
    goals = JSON.parse(fs.readFileSync(goalFilePath));
  }
  goals.push(goal);
  fs.writeFileSync(goalFilePath, JSON.stringify(goals, null, 2));
}

function getGoals() {
  if (!fs.existsSync(goalFilePath)) return [];
  return JSON.parse(fs.readFileSync(goalFilePath));
}

module.exports = { saveGoal, getGoals };
