// Load in content
console.log('Loading content...');
var fs = require('fs'),
    bookmarks = require('./bookmarks.orig.json'),
    bookmarksRoot = bookmarks;

// Process content
var rootChildren = bookmarksRoot.children,
    bookmarkMenu = rootChildren.filter(function (a) { return a.title === "Bookmarks Menu"; })[0],
    bookmarkFolders = bookmarkMenu.children,
    webDevCode = bookmarkFolders.filter(function (a) { return a.title === "web dev code"; })[0].children;

// Format content
console.log('Formatting bookmarks...');
var webDevPretty = webDevCode.map(function (bookmark) {
  // Find the proper description
  var annos = bookmark.annos || [],
      descriptionNode = annos.filter(function (a) { return a.name === 'bookmarkProperties/description'; })[0] || {},
      description = descriptionNode.value || bookmark.title;

  // Create and return the object
  var retObj = {
        title: bookmark.title,
        dateAdded: bookmark.dateAdded,
        lastModified: bookmark.lastModified,
        description: description,
        uri: bookmark.uri
      };
  return retObj;
});

// Spit out the content into a file
var retStr = JSON.stringify(webDevPretty, null, 4);
fs.writeFileSync('./bookmarks.json', retStr, 'utf8');

var retMinStr = JSON.stringify(webDevPretty);
fs.writeFileSync('./bookmarks.min.json', retMinStr, 'utf8');

// Notify the user
console.log('Done!');