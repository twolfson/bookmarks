// Load in assert
var assert = require('assert');

// Basic test
describe('bookmarks', function () {
  describe.skip('formatting a simple set of bookmarks', function () {
    before(function () {
      // Prepare globals for bookmarks
      global.bookmarks = require('./test_files/simple.input.json');
      global.config = require('./test_files/simple.config.json');
      global.output = __dirname + '/actual_files/simple.output.json';

      // Load our bookmarks script
      var bookmarks = require('../lib/bookmarks.js');
    });

    it('returns an matching array of bookmarks', function () {
      // Compare actual output to expected output
      var actualBookmarks = require(global.output),
          expectedBookmarks = require('./expected_files/simple.output.json');
      assert.deepEqual(actualBookmarks, expectedBookmarks);
    });
  });

  describe('formatting a nested set of bookmarks', function () {
    before(function () {
      // Prepare globals for bookmarks
      var bookmarks = require('../bookmarks.orig.json');
      console.log(JSON.stringify(bookmarks, function (key, val) {
        console.log(arguments);
        return undefined;
      }, 4));
      // global.config = require('./test_files/simple.config.json');
      // global.output = __dirname + '/actual_files/simple.output.json';

      // // Load our bookmarks script
      // var bookmarks = require('../lib/bookmarks.js');
    });

    it('returns an matching array of bookmarks', function () {
    //   // Compare actual output to expected output
    //   var actualBookmarks = require(global.output),
    //       expectedBookmarks = require('./expected_files/simple.output.json');
    //   assert.deepEqual(actualBookmarks, expectedBookmarks);
    });
  });
});
