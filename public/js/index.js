// When the DOM is ready
$(function () {
  // Create our List
  var bookmarkList = document.getElementById('bookmark-list'),
      options = {
        valueNames: ['description', 'uri'],
        item: 'bookmark-template'
      },
      list = new List(bookmarkList, options);

  // // Append the list to main
  // var $main = $('#main');
  // $main.append(ul);

  // Add in a few bookmarks
  var bookmarks = [
    {
        "title": "fxn/tkn - Terminal keynote presentation",
        "dateAdded": 1349313664591754,
        "lastModified": 1349313676308463,
        "description": "tkn - Terminal Keynote - A hack for terminal-based talks",
        "uri": "https://github.com/fxn/tkn"
    },
    {
        "title": "pedalboard.js - Open-source JavaScript framework for developing audio effects for guitars",
        "dateAdded": 1349417966733927,
        "lastModified": 1349417969037920,
        "description": "pedalboard.js - Open-source JavaScript framework for developing audio effects for guitars",
        "uri": "http://dashersw.github.com/pedalboard.js/demo/"
    }
  ];
  list.add(bookmarks[0]);
  list.add(bookmarks[1]);
});