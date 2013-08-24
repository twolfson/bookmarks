// Load in assert
var assert = require('assert');

// Basic test
describe('bookmarks', function () {
  describe('formatting a simple set of bookmarks', function () {
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
});
