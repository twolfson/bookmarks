function loadBookmarks(cb) {
  // // Mock bookmarks
  // var bookmarks = [
  //   {
  //       "title": "fxn/tkn - Terminal keynote presentation",
  //       "dateAdded": 1349313664591754,
  //       "lastModified": 1349313676308463,
  //       "description": "tkn - Terminal Keynote - A hack for terminal-based talks",
  //       "uri": "https://github.com/fxn/tkn"
  //   },
  //   {
  //       "title": "pedalboard.js - Open-source JavaScript framework for developing audio effects",
  //       "dateAdded": 1349417966733927,
  //       "lastModified": 1349417969037920,
  //       "description": "pedalboard.js - Open-source JavaScript framework for developing audio e",
  //       "uri": "http://dashersw.github.com/pedalboard.js/demo/"
  //   }
  // ];

  // Load in our bookmarks
  $.getJSON('bookmarks.min.json', function (bookmarks, success, res) {
    // If we were unsuccessful, callback with an error
    if (success !== "success") {
      cb(new Error('Could not load bookmarks.'));
    } else {
    // Otherwise, callback with our bookmarks
      cb(null, bookmarks);
    }
  });
}
window.loadBookmarks = loadBookmarks;