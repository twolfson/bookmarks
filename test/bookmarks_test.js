// Load in assert
var assert = require('assert'),
    parser = require('../lib/bookmarks');

// Basic test
describe('bookmarks', function () {
  describe('formatting a simple set of bookmarks', function () {
    before(function () {
      // Prepare globals for bookmarks
      var input = require('./test_files/simple.input.json'),
          options = require('./test_files/simple.config.json');

      // Parse the bookmarks
      this.output = parser(input, options);
    });

    it('returns an matching array of bookmarks', function () {
      // Compare actual output to expected output
      var actualBookmarks = this.output,
          expectedBookmarks = require('./expected_files/simple.output.json');
      assert.deepEqual(actualBookmarks, expectedBookmarks);
    });
  });

  describe('formatting a nested set of bookmarks', function () {
    before(function () {
      // Prepare globals for bookmarks
      var bookmarks = require('../bookmarks.orig.json');
      console.log(JSON.stringify(bookmarks, function (key, val) {
        // If the key is root or children, return it
        if (key === '' || key === 'children') {
          return val;
        }

        // If this is an array, slice it down
        if (Array.isArray(val)) {
          console.log(key, val.slice(0, 10));
        }

        // Otherwise, return undefined
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
