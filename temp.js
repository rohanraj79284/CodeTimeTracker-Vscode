const vscode = require('vscode');
const path = require('path');
const { ensureDataFilesExist, appendSession, readData, writeData } = require('./storage/storageManager');
// const { updateStreak } = require('./features/streakTracker');
// const { checkAchievements } = require('./features/achievements');

let activeEditor = null;
let activityTimer = null;
let lastActivityTime = null;
let currentProject = null;

const INACTIVITY_LIMIT_MS = 2 * 60 * 1000; // 2 minutes
const TRACK_INTERVAL_MS = 60 * 1000;       // track every 1 min
let trackedMinutes = 0;

function activate(context) {
  console.log('✅ codeTimeTracker extension activated on startup!');

  // Ensure data files exist
  // ensureDataFilesExist();
  let startTrackingCommand = vscode.commands.registerCommand('extension.startTracking', () => {
    if (vscode.window.activeTextEditor) {
      startTracking();
      vscode.window.showInformationMessage('Started tracking!');
    }
  });
  // Register commands for starting and stopping tracking
  let stopTrackingCommand = vscode.commands.registerCommand('extension.stopTracking', () => {
    stopTracking();
    vscode.window.showInformationMessage('Stopped tracking!');
  });
  

  // Initialize active editor and tracking
  activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    startTracking();
  }

  vscode.window.onDidChangeActiveTextEditor(editor => {
    activeEditor = editor;
    if (editor) {
      startTracking();
    } else {
      stopTracking();
    }
  });

  vscode.workspace.onDidChangeTextDocument(() => {
    lastActivityTime = Date.now();
  });

  // Stop tracking on shutdown
  context.subscriptions.push(startTrackingCommand);
  context.subscriptions.push(stopTrackingCommand);
  context.subscriptions.push({ dispose: stopTracking });
}

function startTracking() {
  // if (activityTimer) return;
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
  activate,
  deactivate
};
