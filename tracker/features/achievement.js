const fs = require('fs');
const path = require('path');

const ACHIEVEMENTS_FILE = path.join(__dirname, '..', 'data', 'achievements.json');
const META_FILE = path.join(__dirname, '..', 'data', 'meta.json');
console.log(META_FILE);

const defaultAchievements = {
  explorerBadge: false,
  firstHour: false,
  dailyGrinder: false,
  projectLoyalist: false,
  nightOwl: false,
  timeGoalCrusher: false,
  comebackKid: false,
  codeMarathon: false
};

function loadJSON(file, fallback) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function checkAchievements(userData) {
  const achievements = loadJSON(ACHIEVEMENTS_FILE, defaultAchievements);
  const meta = loadJSON(META_FILE, { hasTrackedBefore: false });

  // 🌟 First Time Use Badge
  if (!achievements.explorerBadge && !meta.hasTrackedBefore) {
    achievements.explorerBadge = true;
    meta.hasTrackedBefore = true;
  }

  // ⏱️ First Hour
  if (!achievements.firstHour && userData.totalTimeMinutes >= 60) {
    achievements.firstHour = true;
  }

  // 🔥 Daily Grinder - 7-day streak
  if (!achievements.dailyGrinder && userData.streak >= 7) {
    achievements.dailyGrinder = true;
  }

  // 📂 Project Loyalist
  if (!achievements.projectLoyalist) {
    for (const project in userData.projectTimes) {
      if (userData.projectTimes[project] >= 600) {
        achievements.projectLoyalist = true;
        break;
      }
    }
  }

  // 🌙 Night Owl
  if (!achievements.nightOwl && userData.lateNightCodingDays >= 3) {
    achievements.nightOwl = true;
  }

  // 🎯 Time Goal Crusher
  if (!achievements.timeGoalCrusher && userData.goalsCompleted >= 1) {
    achievements.timeGoalCrusher = true;
  }

  // 🔁 Comeback Kid
  if (!achievements.comebackKid && userData.daysSinceLastSession >= 3 && userData.todayCoded) {
    achievements.comebackKid = true;
  }

  // 🧱 Code Marathon
  if (!achievements.codeMarathon && userData.longestSessionMinutes >= 240) {
    achievements.codeMarathon = true;
  }

  saveJSON(ACHIEVEMENTS_FILE, achievements);
  saveJSON(META_FILE, meta);
 
  return achievements;
}

// const userData = {
//   totalTimeMinutes: 0,
//   streak: 0,
//   goalsCompleted: 0,
//   longestSessionMinutes:0,
//   projectTimes:{},
//   lateNightCodingDays:0,
//   daysSinceLastSession:1,
//   todayCoded: true
// };
// console.log(checkAchievements(userData));
module.exports = {
  checkAchievements,
  loadAchievements: () => loadJSON(ACHIEVEMENTS_FILE, defaultAchievements)
};
