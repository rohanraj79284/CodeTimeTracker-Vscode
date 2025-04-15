const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');


const files = {
  sessions: 'sessions.json',
  summary: 'summary.json',
  achievements: 'achievements.json',
  meta: 'meta.json'
};

function ensureDataFilesExist() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  Object.values(files).forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    }
  });
}

function readData(fileKey) {
  const filePath = path.join(dataDir, files[fileKey]);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}

function writeData(fileKey, data) {
  const filePath = path.join(dataDir, files[fileKey]);
  console.log("writing the data");
  fs.appendFileSync(filePath, JSON.stringify(data, null, 2)+",");
}

function appendSession(projectName, minutes, dateStr) {
  const sessions = readData('sessions');
  if (!sessions[dateStr]) sessions[dateStr] = {};
  if (!sessions[dateStr][projectName]) sessions[dateStr][projectName] = 0;

  sessions[dateStr][projectName] += minutes;
  const filePath = path.join(dataDir, files["sessions"]);
  fs.appendFileSync(filePath, JSON.stringify(sessions, null, 2)+"\n");
}

module.exports = {
  ensureDataFilesExist,
  readData,
  writeData,
  appendSession
};


// /data
//   ├── sessions.json       → Per-session time logs
//   ├── summary.json        → Total time, streaks, goals completed
//   ├── achievements.json   → Badge unlock states
//   └── meta.json           → Flags like "hasTrackedBefore", "lastActiveDate"