// Load in dependencies
var EventEmitter = require('events').EventEmitter,
    _ = require('underscore');

// Define our bookmark parser
function BookmarkParser(options) {
  // Inherit from EventEmitter
  EventEmitter.call(this);

  // Save options for later
  this.options = options || {};
}

// Extend from EventEmitter
BookmarkParser.prototype = _.extend({
  parse: function (bookmarks) {
    // Denote the root of the bookmarks
    var bookmarksRoot = bookmarks;

    // Process content
    // TODO: Don't make folders required (blacklist by default)
    var configFolders = this.options.folders,
        rootChildren = bookmarksRoot.children,
        bookmarkMenu = rootChildren.filter(function (a) { return a.title === "Bookmarks Menu"; })[0],
        bookmarkFolders = bookmarkMenu.children,
        selectFolders = bookmarkFolders.filter(function (folder) { return configFolders.indexOf(folder.title) !== -1; });

    // Format content
    var retArr = [];
    function addBookmark(bookmark) {
      // Find the proper description
      var annos = bookmark.annos || [],
          descriptionNode = annos.filter(function (a) { return a.name === 'bookmarkProperties/description'; })[0] || {},
          description = descriptionNode.value || bookmark.title;

      // Grab the title and bookmark
      var title = bookmark.title,
          uri = bookmark.uri;

      // If the uri is not defined
      if (uri === undefined) {
        // DEBUG: Give us some info
        // console.log('No URI found (' + bookmark.id + '): ' + title);

        // Add the bookmark as a folder
        return addFolder(bookmark);
      }

      // Create and return the object
      var retObj = {
            title: title,
            dateAdded: bookmark.dateAdded,
            lastModified: bookmark.lastModified,
            description: description,
            uri: uri
          };
      retArr.push(retObj);
    }
    function addFolder(folder) {
      // Add each of the retArr from the folder
      var children = folder.children || [];
      children.forEach(addBookmark);
    }

    // ANTI-PATTERN: Add all of the folders
    selectFolders.forEach(addFolder);

    // Return the retArr
    return retArr;
  }
}, EventEmitter.prototype);

// Create sugar fn for parsing bookmarks
function parseBookmarks(bookmarks, options) {
  // Generate a new parser
  var parser = new BookmarkParser(options);

  // Parse and return bookmarks
  return parser.parse(bookmarks);
}

// Expose the BookmarkParser via parseBookmarks
parseBookmarks.BookmarkParser = BookmarkParser;

// Expose parseBookmarks
module.exports = parseBookmarks;