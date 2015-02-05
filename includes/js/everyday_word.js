var Word = new function() {

  /**
   * Display data from ajax result.
   */
  this.displayData = function() {
    chrome.storage.sync.get('everyday_word_last_id', function(items) {
      var everyday_word_url = 'http://everydayword.ru/api/v1/word/';

      if (items.everyday_word_last_id == undefined) {
        everyday_word_url += '0';
      }
      else {
        everyday_word_url += items.everyday_word_last_id;
      }

      jQuery.ajax({
        url: everyday_word_url,
        dataType: 'json',
        success: function(response) {
          if (response.result.status == 1) {
            jQuery('#word h3.title').html(response.result.data.title_link);
            jQuery('#word p.description').html(response.result.data.description);
            jQuery('#word div.category').html(chrome.i18n.getMessage('authorTitle') + ': ' + response.result.data.author_link);

            chrome.storage.sync.set({'everyday_word_last_data': response.result.data}, function() {});
            chrome.storage.sync.set({'everyday_word_last_id': response.result.data.id}, function() {});
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
    chrome.storage.sync.get('everyday_word_last_data', function(items) {
      jQuery('#word h3.title').html(items.everyday_word_last_data.title_link);
      jQuery('#word p.description').html(items.everyday_word_last_data.description);
      jQuery('#word div.category').html(chrome.i18n.getMessage('authorTitle') + ': ' + items.everyday_word_last_data.author_link);
    });
  }
};
