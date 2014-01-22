# bookmarks

Searchable collection of bookmarks in a webpage

The collection presented at http://twolfson.github.io/bookmarks/ is my personal set distilled from Firefox.

## Running locally
`bookmarks` is hosted via GitHub pages meaning it is a set of static files. You can run a local server via a utility like [serve][].

```bash
# Install server if you haven't yet
npm install -g serve
# npm http GET https://registry.npmjs.org/serve
# npm http 200 https://registry.npmjs.org/serve
# ...

# Run serve
serve
# serving /home/todd/github/bookmarks on port 3000
```

Open http://localhost:3000/ in your browser and you should be presented with the webpage.

[serve]: https://npmjs.org/package/serve

## Installing your bookmarks
`bookmarks.json` is agnostic to being [Firefox][] specific and it is planned that we support [Pinboard][] in the future. The current structure is that from [firefox-bookmarks' flatten method][bookmarks-flatten].

[Firefox]: http://www.mozilla.org/en-US/firefox/new/
[Pinboard]: http://pinboard.in/
[bookmarks-flatten]: https://github.com/twolfson/firefox-bookmarks#bookmarksflatten

- bookmarks `Object[]` - Array of bookmarks
    - Each bookmark should be of the format:
        - title `String` - Name of the folder
        - uri `String` - URL that was saved for the bookmark
        - description `String` - Description for the link
        - dateAdded `Number` - Microseconds (milliseconds/1000) since Linux epoch that `bookmark` was added
        - lastModified `Number` - Microseconds since Linux epoch that `bookmark` was last updated

### Firefox
We provide utility functions to load your [Firefox][] bookmarks.

```bash
# Copy latest bookmark backup to `bookmarks.orig.json`
npm run copy-firefox-bookmarks

# Flatten and beautify `bookmarks.orig.json` into `bookmarks.min.json` and `bookmarks.json`
npm run parse-bookmarks
```

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
