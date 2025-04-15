const { readData, writeData } = require('C:\\Users\\raj07\\OneDrive\\Desktop\\development\\extension\\learn\\codetimetracker\\tracker\\storages\\storageMangager.js');
const { format, subDays, differenceInCalendarDays } = require('date-fns');

function updateStreak(today = new Date(), minutesToday = 0) {
  const summary = readData('summary');
  const heatmap = summary.heatmap || {};

  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');

 
  heatmap[todayStr] = (heatmap[todayStr] || 0) + minutesToday;

  const lastDateStr = summary.lastActiveDate || null;
  const codedYesterday = lastDateStr === yesterdayStr;
  const codedTodayAlready = todayStr === lastDateStr;

  if (minutesToday > 0) {
    if (!codedTodayAlready) {
      if (codedYesterday) {
        summary.currentStreak = (summary.currentStreak || 0) + 1;
      } else {
        summary.currentStreak = 1; // reset streak
      }

      summary.lastActiveDate = todayStr;

      if (!summary.longestStreak || summary.currentStreak > summary.longestStreak) {
        summary.longestStreak = summary.currentStreak;
      }
    }
  }

  summary.heatmap = heatmap;
  writeData('summary', summary);
}

function getStreakInfo() {
  const summary = readData('summary');
  return {
    currentStreak: summary.currentStreak || 0,
    longestStreak: summary.longestStreak || 0,
    heatmap: summary.heatmap || {}
  };
}

module.exports = {
  updateStreak,
  getStreakInfo
};
