jQuery(document).ready(function() {
  everyday_init();

  chrome.storage.sync.get('everyday_show', function(items) {
    chrome.browserAction.setBadgeText({text: ''});
    if (items.everyday_show == undefined || items.everyday_show == true) {
      Drupal.displayData();
      Word.displayData();
      chrome.storage.sync.set({'everyday_show': false}, function() {});
    }
    else {
      Drupal.displayStoredData();
      Word.displayStoredData();
    }
  });
});
