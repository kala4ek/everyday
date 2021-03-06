chrome.alarms.create('everyday_alarm', {periodInMinutes: 30});

/**
 * Show notification about new tips.
 */
function everyday_notify() {
  chrome.notifications.create(
    'name-for-notification',
    {
      type: 'basic',
      iconUrl: 'icons/everyday128.png',
      title: "EveryDay",
      message: chrome.i18n.getMessage('notificationText')
    },
    function() {}
  );
  chrome.browserAction.setBadgeText({text: '1'});
}

/**
 * Check if it's time to update the tip?
 */
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'everyday_alarm') {
    chrome.storage.sync.get('everyday_last_date', function(items) {

      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.round(diff / oneDay);

      if (items.everyday_last_date == undefined || items.everyday_last_date != day) {
        chrome.storage.sync.set({'everyday_last_date': day}, function() {});
        chrome.storage.sync.set({'everyday_show': true}, function() {
          everyday_notify();
        });
      }
    });
  }
});
