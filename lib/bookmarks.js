module.exports = function (bookmarks, options) {

// Load in content
console.log('Loading content...');
var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    bookmarksRoot = bookmarks;

// Process content
var configFolders = options.folders,
    rootChildren = bookmarksRoot.children,
    bookmarkMenu = rootChildren.filter(function (a) { return a.title === "Bookmarks Menu"; })[0],
    bookmarkFolders = bookmarkMenu.children,
    selectFolders = bookmarkFolders.filter(function (folder) { return configFolders.indexOf(folder.title) !== -1; });

// Format content
console.log('Formatting bookmarks...');
bookmarks = [];
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
    addFolder(bookmark);
  }

  // Create and return the object
  var retObj = {
        title: title,
        dateAdded: bookmark.dateAdded,
        lastModified: bookmark.lastModified,
        description: description,
        uri: uri
      };
  bookmarks.push(retObj);
}
function addFolder(folder) {
  // Add each of the bookmarks from the folder
  var children = folder.children || [];
  children.forEach(addBookmark);
}

// ANTI-PATTERN: Add all of the folders
selectFolders.forEach(addFolder);

// Return the bookmarks
return bookmarks;

};