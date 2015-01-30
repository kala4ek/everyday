chrome.alarms.create('everyday_alarm', {periodInMinutes: 1});

function everyday_notify() {
  chrome.notifications.create(
    'name-for-notification',
    {
      type: 'basic',
      iconUrl: 'icons/everyday_icon128.png',
      title: "EveryDay",
      message: "Today's tips are available for you!"
    },
    function() {}
  );
  chrome.browserAction.setBadgeText({text: '1'});
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'everyday_alarm') {
    chrome.storage.sync.get('everyday_last_date', function(items) {

      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60;
      var day = Math.round(diff / oneDay);

      if (items.everyday_last_date == undefined || (items.everyday_last_date > day || day > items.everyday_last_date)) {
        chrome.storage.sync.set({'everyday_last_date': day}, function() {});
        chrome.storage.sync.set({'everyday_show': true}, function() {
          everyday_notify();
        });
      }
    });
  }
});
