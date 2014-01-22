// When the DOM is ready
$(function () {
  // Grab our template
  var template = $('#bookmark-template').html();

  // Load our bookmarks
  window.loadBookmarks(function (err, bookmarks) {
    // If there was an error, throw it
    if (err) { throw err; }

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
          valueNames: ['title', 'uri'],
          plugins: [
            ['matchSearch']
          ]
        },
        list = new List('bookmark-list-container', options);

    // Set up search function
    var $search = $('#search'),
        defaultColumns = {title:1,uri:1},
        columns = defaultColumns;
    function searchList() {
      var val = $search.val();
      list.matchSearch(val, columns);
    }

    // When our search field is typed into, search
    // TODO: Change to onchange
    $search.on('keyup', searchList);

    // When the search form is submitted, search
    var $searchForm = $('#search-form');
    $searchForm.on('submit', function (e) {
      // Prevent the submission
      e.preventDefault();

      // Search the list
      searchList();
    });

    // When one of the search links is clicked
    // TODO: This should fire a method of a Search class
    var $searchBtn = $searchForm.find('.search-btn');
    $searchForm.on('click', 'a', function () {
      // Grab the text
      var $a = $(this),
          search = $a.data('search'),
          text = $a.data('text');

      // Update the button text
      $searchBtn.text(text);

      // If the search is *, use the default columns
      if (search === '*') {
        columns = defaultColumns;
      } else {
      // Otherwise, search the specific column
        columns = {};
        columns[search] = 1;
      }

      // Search meow
      searchList();
    });
  });
});