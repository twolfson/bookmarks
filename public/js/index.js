// When the DOM is ready
$(function () {
  // Grab our template
  var template = $('#bookmark-template').html();

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

    // Iterate over the bookmarks
    var bookmarkHtmlArr = bookmarks.map(function (bookmark) {
          var html = templatez(template, bookmark);
          return html;
        }),
        bookmarkHtml = bookmarkHtmlArr.join('');

    // Append the content to our table
    var bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = bookmarkHtml;

    // Performify the list
    var options = {
          valueNames: ['description', 'uri'],
          plugins: [
            ['fuzzySearch']
          ]
        },
        list = new List('bookmark-list-container', options);

    // Set up search function
    var $fuzzySearch = $('.fuzzy-search');
    function searchList() {
      var val = $fuzzySearch.val();
      list.fuzzySearch(val);
    }

    // When our search field is typed into, search
    // TODO: Change to onchange
    // TODO: Allow for exclusive searching of description or URI
    $fuzzySearch.on('keyup', searchList);
  });
});