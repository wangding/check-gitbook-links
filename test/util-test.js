/* global describe it: true */

const isHTML   = require('../lib/util').isHTML,
      getPages = require('../lib/util').getPages,
      getLinks = require('../lib/util').getLinks,
      expect   = require('chai').expect;

describe('isHTML 测试用例', function() {
  it('"abc" is not HTML file', function() {
    expect(isHTML('abc')).to.be.not.ok;
  });

  it('"abc.json" is not HTML file', function() {
    expect(isHTML('abc.json')).to.be.not.ok;
  });

  it('"abc.html" is HTML file', function() {
    expect(isHTML('abc.html')).to.be.ok;
  });
});

describe('getPages 测试用例', function() {
  const join = require('path').join;

  it('"_book" directory', function() {
    var pages = getPages(join(__dirname, '_book'));
    expect(pages.length > 0).to.be.ok;
    console.log(pages);
  });
});

describe('getLinks 测试用例', function() {
  const join = require('path').join;
  var pages = getPages(join(__dirname, '_book'));

  it('all links', function() {
    var links = getLinks(pages);
    expect(typeof links !== 'undefined').to.be.ok;
    console.log(links);
  });
});
