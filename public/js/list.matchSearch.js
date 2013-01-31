List.prototype.plugins.matchSearch = function(locals, options) {
    var self = this;

    // fancyFilter, taken from https://github.com/Ensighten/Halo.extras/blob/master/src/public/js/Helper.js
    var searchFunction = function (needles, haystack) {
      var i,
          needleArr = needles.split(/\s+/g),
          needle,
          needleRegexpArr = [],
          regexp,
          retVal = true,
          hasUpperCase,
          regexpFlags;

      // Create filters on an 'and' basis (for 'or' use .join('|'))
      for (i = needleArr.length; i--;) {
        needle = needleArr[i];

        // If the item uses upper case, be case sensitive. Otherwise, don't.
        hasUpperCase = !!needle.match(/[A-Z]/),
        regexpFlags = hasUpperCase ? '' : 'i';

        // Generate the filter and push it onto the array
        needleRegexpArr.push( new RegExp(needle, regexpFlags) );
      }

      for (i = needleRegexpArr.length; i--;) {
        // If the unused option matches the regexp
        if (!haystack.match(needleRegexpArr[i])) {
          retVal = false;
          break;
        }
      }

      return retVal;
    };


    return (function() {
        var func = function(searchString, columns) {
            self.i = 1; // Reset paging
            var searchArguments,
                foundArgument,
                matching = [],
                found,
                item,
                text,
                values,
                is,
                multiSearch = (typeof options.multiSearch !== 'boolean') ? true : options.multiSearch,
                columns = (columns === undefined) ? self.items[0].values() : columns,
                searchString = (searchString === undefined) ? "" : searchString,
                target = searchString.target || searchString.srcElement; /* IE have srcElement */

            searchString = (target === undefined) ? (""+searchString) : ""+target.value;
            is = self.items;

            // Substract arguments from the searchString or put searchString as only argument
            searchArguments = multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

            locals.templater.clear();
            if (searchString === "") {
                locals.reset.search();
                self.searched = false;
                self.update();
            } else {
                self.searched = true;

                for (var k = 0, kl = is.length; k < kl; k++) {
                    found = true;
                    item = is[k];
                    values = item.values();

                    for(var i = 0; i < searchArguments.length; i++) {
                        foundArgument = false;

                        for(var j in columns) {
                            if(values.hasOwnProperty(j) && columns[j] !== null) {
                                text = values[j] || "";
                                if (searchFunction(searchArguments[i], text, options)) {
                                    foundArgument = true;
                                }
                            }
                        }
                        if(!foundArgument) found = false;
                    }
                    if (found) {
                        item.found = true;
                        matching.push(item);
                    } else {
                        item.found = false;
                    }
                }
                self.update();
            }
            return self.visibleItems;
        },
        timeout;

        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, 100);
        };
    }());
};