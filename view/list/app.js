var dependencies = [
 './contacts/js/activities.js',
 './shared/js/contacts/utilities/event_listeners.js'
];

// If the cache is enabled, we push lazy loading l10n to the extreme,
// cause we will be applying the transalations manually from the cached
// content.
// Otherwise, we load the l10n scripts along with the rest of the JS
// scripts. This will avoid the non localized text to appear in the screen.
if (!Cache.active) {
  dependencies.push('../../shared/js/l10n.js');
  dependencies.push('../../shared/js/l10n_date.js');
}

LazyLoader.load(dependencies, () => {
  ['../../shared/js/contact_photo_helper.js',
   '../../shared/js/text_normalizer.js',
   '../../shared/js/contacts/utilities/templates.js'
   ].forEach((src) => {
    var scriptNode = document.createElement('script');
    scriptNode.src = src;
    scriptNode.setAttribute('defer', true);
    document.head.appendChild(scriptNode);
  });
  //return LazyLoader.load('/contacts/js/contacts.js');
});

var contactsList = null;

var SHARED = 'shared';
var SHARED_PATH = '../../' + SHARED + '/' + 'js';

var SHARED_UTILS = 'sharedUtilities';
var SHARED_UTILS_PATH = SHARED_PATH + '/contacts/import/utilities';

LazyLoader.load(['../../contacts/js/views/list.js'], function() {
  LazyLoader.load(
    [SHARED_UTILS_PATH + '/misc.js',
     '../../shared/js/contacts/import/utilities/config.js',
     '../../shared/js/contacts/sms_integration.js',
     '../../shared/js/contacts/utilities/dom.js',
     '../../contacts/js/utilities/cookie.js',
     '../../shared/js/contacts/contacts_shortcuts.js',
     '../../shared/js/contacts/contacts_buttons.js'],
  function() {

    if (contactsList) {
      return;
    }
    contactsList = contactsList || contacts.List;
    var list = document.getElementById('groups-list');
    contactsList.init(list);
    getFirstContacts();
    contactsList.initAlphaScroll();
    /*contactsList.handleClick(contactListClickHandler);*/
    //checkCancelableActivity();

    function getFirstContacts() {
      var onerror = function() {
        console.error('Error getting first contacts');
      };
      contactsList = contactsList || contacts.List;

      contactsList.getAllContacts(onerror);
    };

  });
});
