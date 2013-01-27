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
      list.fuzzySearch(val, {'description':1});
    }

    // When our search field is typed into, search
    // TODO: Change to onchange
    // TODO: Allow for exclusive searching of description or URI
    $fuzzySearch.on('keyup', searchList);

    // When the search form is submitted, search
    var $searchForm = $('#search-form');
    $searchForm.on('submit', function (e) {
      // Prevent the submission
      e.preventDefault();

      // Search the list
      searchList();
    });

    // When one of the search links is clicked
    var $searchBtn = $searchForm.find('.search-btn');
    $searchForm.on('click', 'a', function () {
      // Grab the text and sort
      var $a = $(this);
    });
  });
});