const vscode = require('vscode');
const path = require('path');
const { ensureDataFilesExist, appendSession, readData, writeData } = require('C:\\Users\\raj07\\OneDrive\\Desktop\\development\\extension\\learn\\codetimetracker\\tracker\\storages\\storageMangager.js');
// const {updateStreak} = require('C:\\Users\\raj07\\OneDrive\\Desktop\\development\\extension\\learn\\codetimetracker\\tracker\\features\\streakTracker.js');
// const { checkAchievements } = require('C:\\Users\\raj07\\OneDrive\\Desktop\\development\\extension\\learn\\codetimetracker\\features\\achievement.js');

let activeEditor = null;
let activityTimer = null;
let lastActivityTime = null;
let currentProject = null;

const INACTIVITY_LIMIT_MS = 2 * 60 * 1000; 
const TRACK_INTERVAL_MS = 60 * 1000;      
let trackedMinutes = 0;


function startTracking() {
  if (activityTimer) return;
  console.log("tracking started");
  currentProject = getProjectName();

  lastActivityTime = Date.now();
  activityTimer = setInterval(() => {
    const now = Date.now();
    const inactive = now - lastActivityTime > INACTIVITY_LIMIT_MS;

    if (!inactive) {
      trackedMinutes += 1;

      // 📦 Save session
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      appendSession(currentProject, 1, dateStr);

      // 📊 Update summary
      const summary = readData('summary');
      summary.totalTimeMinutes = (summary.totalTimeMinutes || 0) + 1;
      summary.longestSessionMinutes = Math.max(summary.longestSessionMinutes || 0, trackedMinutes);
      summary.goalsCompleted = summary.goalsCompleted || 0; // default
      summary.projectTimes = summary.projectTimes || {};
      summary.projectTimes[currentProject] = (summary.projectTimes[currentProject] || 0) + 1;
      writeData('summary', summary);

      console.log("updated summary");

      // 🔥 Update streak
      // updateStreak(today, 1);

      // 🏆 Check achievements
      const userData = {
        totalTimeMinutes: summary.totalTimeMinutes,
        streak: summary.currentStreak || 0,
        goalsCompleted: summary.goalsCompleted || 0,
        longestSessionMinutes: summary.longestSessionMinutes || 0,
        projectTimes: summary.projectTimes || {},
        lateNightCodingDays: summary.lateNightCodingDays || 0,
        daysSinceLastSession: getDaysSince(summary.lastActiveDate),
        todayCoded: true
      };

      // checkAchievements(userData);
    }
  }, TRACK_INTERVAL_MS);
}
/**
 * Stops tracking and saves time spent on the active file.
 */
function stopTracking() {
  if (activeFile && startTime !== null) {
    const duration = Date.now() - startTime;
    trackedTimes[activeFile] = (trackedTimes[activeFile] || 0) + duration;
    console.log(`🕒 Tracked: ${activeFile} - ${trackedTimes[activeFile]} ms`);
  }
  activeFile = null;
  startTime = null;
}

/**
 * Returns the current tracked data.
 */
function stopTracking(final = false) {
  if (activityTimer) {
    clearInterval(activityTimer);
    activityTimer = null;

    if (final && trackedMinutes > 0) {
      console.log(`⏹️ Stopped tracking. Total tracked: ${trackedMinutes} minutes.`);
    }

    trackedMinutes = 0;
  }
}

function getProjectName() {
  const folder = vscode.workspace.workspaceFolders?.[0];
  return folder ? path.basename(folder.uri.fsPath) : 'Untitled Project';
}

function getDaysSince(lastDateStr) {
  if (!lastDateStr) return 999;
  const last = new Date(lastDateStr);
  const today = new Date();
  const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24));
  return diff;
}

function deactivate() {
  stopTracking(true);
}

module.exports = {
  startTracking,
  stopTracking,
};
