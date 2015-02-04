var Drupal = new function() {

  /**
   * Display data from ajax result.
   */
  this.displayData = function() {
    chrome.storage.sync.get('everyday_drupal_last_id', function(items) {
      var everyday_locale = chrome.i18n.getMessage('@@ui_locale');
      var everyday_drupal_url = 'http://drupal-ed.com/'
        + everyday_locale.split('_')[0]
        + '/api/v1/tip/';

      if (items.everyday_drupal_last_id == undefined) {
        everyday_drupal_url += '0';
      }
      else {
        everyday_drupal_url += items.everyday_drupal_last_id;
      }

      jQuery.ajax({
        url: everyday_drupal_url,
        dataType: 'json',
        success: function(response) {
          if (response.result.status == 1) {
            jQuery('#drupal h3.title').html(response.result.data.title_link);
            jQuery('#drupal p.description').html(response.result.data.description);
            jQuery('#drupal div.category').html(response.result.data.category_link);

            chrome.storage.sync.set({'everyday_show': false}, function() {});
            chrome.storage.sync.set({'everyday_drupal_last_data': response.result.data}, function() {});
            chrome.storage.sync.set({'everyday_drupal_last_id': response.result.data.id}, function() {});
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
  };

  /**
   * Display data from storage.
   */
  this.displayStoredData = function() {
    chrome.storage.sync.get('everyday_drupal_last_data', function(items) {
      jQuery('#drupal h3.title').html(items.everyday_drupal_last_data.title_link);
      jQuery('#drupal p.description').html(items.everyday_drupal_last_data.description);
      jQuery('#drupal div.category').html(items.everyday_drupal_last_data.category_link);
    });
  }
};
