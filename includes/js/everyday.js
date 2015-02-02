jQuery(document).ready(function() {
  jQuery('html').on('contextmenu', function(e) {
    e.preventDefault();
  });

  jQuery('p.description').html(chrome.i18n.getMessage('loadingText'));
  jQuery('li a[aria-controls="drupal"]').html(chrome.i18n.getMessage('drupalBlockTitle'));

  chrome.storage.sync.get('everyday_show', function(items) {
    if (items.everyday_show == undefined || items.everyday_show == true) {
      chrome.browserAction.setBadgeText({text: ''});
      chrome.storage.sync.get('everyday_last_id', function(items) {
        var everyday_locale = chrome.i18n.getMessage('@@ui_locale');
        var everyday_drupal_url = 'http://drupal-ed.com/'
          + everyday_locale.split('_')[0]
          + '/api/v1/tip/';

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
            if (response.result.status == 1) {
              jQuery('h3.title').html(response.result.data.title_link);
              jQuery('p.description').html(response.result.data.description);
              jQuery('div.category').html(response.result.data.category_link);

              chrome.storage.sync.set({'everyday_show': false}, function() {});
              chrome.storage.sync.set({'everyday_last_data': response.result.data}, function() {});
              chrome.storage.sync.set({'everyday_last_id': response.result.data.id}, function() {});
            }
            else {
              alert(response.result.error);
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
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
