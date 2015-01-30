chrome.storage.sync.get('everyday_last_date', function(items) {

  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60;
  var day = Math.round(diff / oneDay);

  if (items.everyday_last_date == undefined || (items.everyday_last_date > day || day > items.everyday_last_date)) {
    chrome.storage.sync.set({'everyday_last_date': day}, function() {});
    chrome.storage.sync.get('everyday_last_id', function(items) {
      var everyday_drupal_url = "http://drupal-ed.com/en/js/ded_api/tip_get?last_id=";

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
            jQuery('h3#title').html(response.data.title_link);
            jQuery('p#description').html(response.data.description);
            jQuery('div#category').html(response.data.category_link);

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
      jQuery('h3#title').html(items.everyday_last_data.title_link);
      jQuery('p#description').html(items.everyday_last_data.description);
      jQuery('div#category').html(items.everyday_last_data.category_link);
    });
  }
});
