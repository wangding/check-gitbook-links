function isHTML(file) {
  var len = file.length;

  return file.slice(len-5, len) === '.html' ? true : false;
}

var _pages = [];     // HTML files to check broken links

function _getPg(dir) {
  const fs   = require('fs'),
        join = require('path').join;

  var files = fs.readdirSync(dir);
  files.forEach(function(file) {
    file = join(dir, file);
    if(fs.statSync(file).isFile && isHTML(file)) {
      _pages.push(file);
    }

    var isGitbook = (file.match(/\w*gitbook$/) !== null);
    if(fs.statSync(file).isDirectory() && !isGitbook) {
      _getPg(file);
    }
  });
}

function getPages(dir) {
  _getPg(dir);

  return _pages;
}

var links = {};    // links in all pages
/* data format
 * {
 *    'page1.html': ['link1', 'link2', ..., 'linkn'],
 *    'pages.html': ['linka', 'linkb', ..., 'linkm'],
 *    ...
 * }
 */

function _initLinks(files) {
  for(var i=0; i<files.length; i++) links[files[i]] = [];
}

function getLinks(files) {
  var onlyOne = {};

  const cheerio       = require('cheerio'),
        fs            = require('fs'),
        isAbsoluteUrl = require('is-absolute-url');

  _initLinks(files);

  for(var i=0; i<files.length-1; i++) {
    const html = fs.readFileSync(files[i]).toString('utf8'),
          $    = cheerio.load(html),
          archors = $('.search-noresults').find('a');

    for(var j=0; j<archors.length; j++) {
      var url = archors[j].attribs.href;

      if(isAbsoluteUrl(url) && typeof onlyOne[url] === 'undefined') {
        onlyOne[url] = url;
        links[files[i]].push(url);
      }
    }
  }

  return links;
}

module.exports.isHTML = isHTML;
module.exports.getPages = getPages;
module.exports.getLinks = getLinks;
