jQuery(document).ready(function() {
jQuery('p.description').html(chrome.i18n.getMessage('loadingText'));
jQuery('li a[aria-controls="drupal"]').html(chrome.i18n.getMessage('drupalBlockTitle'));

  chrome.storage.sync.get('everyday_show', function(items) {
    if (items.everyday_show == undefined || items.everyday_show == true) {
      chrome.browserAction.setBadgeText({text: ''});
      chrome.storage.sync.set({'everyday_show': false}, function() {});
      chrome.storage.sync.get('everyday_last_id', function(items) {
        var everyday_locale = chrome.i18n.getMessage('@@ui_locale');
        var everyday_drupal_url = 'http://drupal-ed.com/'
          + everyday_locale.split('_')[0]
          + '/js/ded_api/tip_get?last_id=';

        if (items.everyday_last_id == undefined) {
          everyday_drupal_url += '0';
        }
        else {
          everyday_drupal_url += items.everyday_last_id;
        }

        jQuery.ajax({
          url: everyday_drupal_url,
          dataType: 'json',
          success: function(response) {
            if (response.status == 1) {
              jQuery('h3.title').html(response.data.title_link);
              jQuery('p.description').html(response.data.description);
              jQuery('div.category').html(response.data.category_link);

              chrome.storage.sync.set({'everyday_last_data': response.data}, function() {});
              chrome.storage.sync.set({'everyday_last_id': response.data.id}, function() {});
            }
            else {
              alert(response.error);
            }
          }
        });
      });
    }
    else {
      chrome.storage.sync.get('everyday_last_data', function(items) {
        jQuery('h3.title').html(items.everyday_last_data.title_link);
        jQuery('p.description').html(items.everyday_last_data.description);
        jQuery('div.category').html(items.everyday_last_data.category_link);
      });
    }
  });
});
