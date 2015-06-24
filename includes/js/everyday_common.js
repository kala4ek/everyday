/**
 * Initial of extension.
 */
function everyday_init() {
  jQuery('html').on('contextmenu', function(e) {
    e.preventDefault();
  });

  jQuery('p.description').html(chrome.i18n.getMessage('loadingText'));
  jQuery('li a[aria-controls="word"]').html(chrome.i18n.getMessage('wordBlockTitle'));
}
