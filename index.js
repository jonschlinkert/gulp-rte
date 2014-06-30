'use strict';
var through = require('through2');
var Route = require('rte');
var extend = require('xtend');

module.exports = function (propstring, opts) {
  var rte = new Route(opts);
  rte.set('dest', ':dest/' + (propstring || ':basename:ext'));

  return through.obj(function(file, enc, cb) {
    var options = extend({}, {dest: file.base}, opts);
    file.path = rte.dest(file.path, 'dest', options);
    this.push(file);
    cb();
  });
};