// When the DOM is ready
$(function () {
  // Grab our template
  var template = $('#bookmark-template').html();

  function bookmarkToHtml(bookmark) {
    var html = templatez(template, bookmark);
    return html;
  }

  // Load in our bookmarks
  $.getJSON('bookmarks.min.json', function (bookmarks, success, res) {
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

    // Slice off the first 200 bookmarks
    var firstBookmarks = bookmarks.slice(0, 150),
        excessBookmarks = bookmarks.slice(200, 202);

    // Iterate over the bookmarks
    var bookmarkHtmlArr = firstBookmarks.map(bookmarkToHtml),
        bookmarkHtml = bookmarkHtmlArr.join('');

    // Append the content to our table
    var bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = bookmarkHtml;

    // Performify the list
    var options = {
          valueNames: ['description', 'uri']
        },
        list = new List('bookmark-list-container', options);

    // Add the remaining bookmarks
    var excessBookmarksHtmlArr = excessBookmarks.map(bookmarkToHtml);
console.log(excessBookmarksHtmlArr[0]);
    // Append them via list.js
    list.add(excessBookmarksHtmlArr[0]);
  });
});