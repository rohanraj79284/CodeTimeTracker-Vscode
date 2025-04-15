const fs = require('fs');
const path = require('path');
const tagManager = require('./tagManager');

const dataPath = path.join(__dirname, '..', 'data', 'timeData.json');

function loadTimeData() {
  if (!fs.existsSync(dataPath)) return {};
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function saveTimeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

function addTime(filePath, minutes) {
  const data = loadTimeData();
  const folder = path.dirname(filePath).split(path.sep).pop();

  // by folder
  if (!data[folder]) data[folder] = 0;
  data[folder] += minutes;

  // by tags
  const tags = tagManager.getTags(filePath);
  tags.forEach(tag => {
    if (!data[tag]) data[tag] = 0;
    data[tag] += minutes;
  });

  saveTimeData(data);
}

function getTimeByCategory() {
  return loadTimeData();
}

module.exports = {
  addTime,
  getTimeByCategory
};
