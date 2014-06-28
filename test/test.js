/*!
 * gulp-rte <https://github.com/jonschlinkert/gulp-rte>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var gutil = require('gulp-util');
var expect = require('chai').expect;
var rte = require('..');


describe('rte dest routing', function () {
  it('should route dest files using the given patterns.', function (done) {
    var stream = rte();
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/faux.js',
      contents: null
    });

    stream.once('data', function (file) {
      expect(file.path).to.equal('test/fixtures/faux.js');
      done();
    });
    stream.write(expected);
    stream.end();
  });

  it('should route dest files using the given patterns.', function (done) {
    var stream = rte(':basename:ext');
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/faux.js',
      contents: null
    });

    stream.once('data', function (file) {
      var basename = path.basename(file.path);
      expect(basename).to.equal('faux.js');
      done();
    });
    stream.write(expected);
    stream.end();
  });

  it('should route dest files using the given patterns.', function (done) {
    var stream = rte(':basename.min.js');
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/faux.js',
      contents: null
    });

    stream.once('data', function (file) {
      var basename = path.basename(file.path);
      expect(basename).to.equal('faux.min.js');
      done();
    });
    stream.write(expected);
    stream.end();
  });

  it('should route dest files using the given patterns.', function (done) {
    var stream = rte(':dist/:basename:ext', {
      dist: '_gh_pages'
    });
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/faux.js',
      contents: null
    });

    stream.once('data', function (file) {
      expect(file.path).to.equal('test/fixtures/_gh_pages/faux.js');
      done();
    });
    stream.write(expected);
    stream.end();
  });

  it('should use an arbitrary non-prop string in the dest', function (done) {
    var stream = rte('foo/:dist/:basename:ext', {
      dist: '_gh_pages'
    });
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/faux.js',
      contents: null
    });

    stream.once('data', function (file) {
      expect(file.path).to.equal('test/fixtures/foo/_gh_pages/faux.js');
      done();
    });
    stream.write(expected);
    stream.end();
  });

  it('should use an arbitrary non-prop string in the dest', function (done) {
    var stream = rte('out-fixtures/:basename:ext');
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/faux.js',
      contents: null
    });

    stream.once('data', function (file) {
      expect(file.path).to.equal('test/fixtures/out-fixtures/faux.js');
      done();
    });
    stream.write(expected);
    stream.end();
  });

  it('should pass through writes with cwd', function (done) {
    var stream = rte('out-fixtures/:basename:ext');
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/test.coffee',
      contents: null
    });

    stream.once('data', function (file) {
      expect(file.path).to.equal('test/fixtures/out-fixtures/test.coffee');
      done();
    });

    stream.write(expected);
    stream.end();
  });

  it('should use arbitrary properties defined in the options', function (done) {
    var stream = rte(':a/:b/:c/:basename:ext', {a: 'one', b: 'two', c: 'three'});
    var expected = new gutil.File({
      cwd: './',
      base: 'test/fixtures',
      path: 'test/fixtures/test.coffee',
      contents: null
    });
    stream.once('data', function (file) {
      expect(file.path).to.equal('test/fixtures/one/two/three/test.coffee');
      done();
    });

    stream.write(expected);
    stream.end();
  });
});