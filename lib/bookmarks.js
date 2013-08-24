// Load in content
console.log('Loading content...');
var fs = require('fs'),
    path = require('path'),
    bookmarks = global.bookmarks || require('./bookmarks.orig.json'),
    bookmarksRoot = bookmarks;

// Process content
var config = global.config || require('./config'),
    configFolders = config.folders,
    rootChildren = bookmarksRoot.children,
    bookmarkMenu = rootChildren.filter(function (a) { return a.title === "Bookmarks Menu"; })[0],
    bookmarkFolders = bookmarkMenu.children,
    selectFolders = bookmarkFolders.filter(function (folder) { return configFolders.indexOf(folder.title) !== -1; });

// Format content
console.log('Formatting bookmarks...');
var bookmarks = [];
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

// Guarantee an output folder
var outputFile = global.output || './bookmarks.json',
    outputDir = path.dirname(outputFile);
mkdirp.sync(outputDir);

// Spit out the content into a file
var retStr = JSON.stringify(bookmarks, null, 4);
fs.writeFileSync(outputFile, retStr, 'utf8');

// TODO: Re-enable once done testing
// var retMinStr = JSON.stringify(bookmarks);
// fs.writeFileSync(global.outputMin || './bookmarks.min.json', retMinStr, 'utf8');

// Notify the user
console.log('Done!');