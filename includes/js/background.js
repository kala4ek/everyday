chrome.alarms.create('everyday_alarm', {periodInMinutes: 1});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log('Alarm');
  console.log(alarm);
});