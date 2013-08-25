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
      // require('grunt').file.write(__dirname + '/actual_files/simple.output.json', JSON.stringify(this.output, null, 4));
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
      var input = require('./test_files/nested.input.json'),
          options = require('./test_files/nested.config.json');

      // Parse the bookmarks
      this.output = parser(input, options);
      require('grunt').file.write(__dirname + '/actual_files/nested.output.json', JSON.stringify(this.output, null, 4));
    });

    it('returns an matching array of bookmarks', function () {
      // Compare actual output to expected output
      var actualBookmarks = this.output,
          expectedBookmarks = require('./expected_files/nested.output.json');
      assert.deepEqual(actualBookmarks, expectedBookmarks);
    });
  });
});
