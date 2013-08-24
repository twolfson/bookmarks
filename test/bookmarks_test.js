describe('bookmarks', function () {
  describe('formatting a simple set of bookmarks', function () {
    before(function () {
      // Prepare globals for bookmarks
      global.bookmarks = require('./test_files/test_filessimple.input.json');
      global.config = require('./test_files/test_filessimple.config.json');
      global.output = require(__dirname + '/test_files/actual_files/simple.output.json');

      // Load our bookmarks script
      var bookmarks = require('../lib/bookmarks.js');
    });

    it('returns an matching array of bookmarks', function () {
      // Read
    });
  });
});
