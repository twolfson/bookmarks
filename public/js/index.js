// When the DOM is ready
$(function () {
  // Create our List
  var bookmarkList = document.getElementById('bookmark-list'),
      options = {
        valueNames: ['description', 'uri'],
        item: 'bookmark-template'
      },
      list = new List(bookmarkList, options);

  // When the list is updated
  list.on('updated', function () {
    // Iterate over each of the li's
    $(bookmarkList).find('li > a').each(function () {
      // Set the href to the innerHTML
      this.setAttribute('href', this.innerHTML);
    });
  });

  // Load in our bookmarks
  $.getJSON('bookmarks.min.json', function (bookmarks, success, res) {
    bookmarks.forEach(function (bookmark) {
      list.add(bookmark);
    });
  });
});