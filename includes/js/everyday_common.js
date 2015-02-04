/**
 * Compare extension versions.
 */
function version_compare(left, right) {
  if (typeof left + typeof right != 'stringstring') {
    return false;
  }

  var a = left.split('.')
    ,   b = right.split('.')
    ,   i = 0, len = Math.max(a.length, b.length);

  for (; i < len; i++) {
    if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
      return 1;
    }
    else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
      return -1;
    }
  }

  return 0;
}

/**
 * Initial of extension.
 */
function everyday_init() {
//  jQuery('html').on('contextmenu', function(e) {
//    e.preventDefault();
//  });

  jQuery('p.description').html(chrome.i18n.getMessage('loadingText'));
  jQuery('li a[aria-controls="drupal"]').html(chrome.i18n.getMessage('drupalBlockTitle'));
  jQuery('li a[aria-controls="word"]').html(chrome.i18n.getMessage('wordBlockTitle'));
}
