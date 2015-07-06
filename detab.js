(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.detab = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var repeat = require('repeat-string');

/*
 * Constants.
 */

var TAB = '\t';
var NEWLINE = '\n';
var SPACE = ' ';

/**
 * Replace tabs with spaces, being smart about which
 * column the tab is at and which size should be used.
 *
 * @example
 *   detab('\tfoo\nbar\tbaz'); // '    foo\nbar baz'
 *   detab('\tfoo\nbar\tbaz', 2); // '  foo\nbar baz'
 *   detab('\tfoo\nbar\tbaz', 8); // '        foo\nbar     baz'
 *
 * @param {string} value - Value with tabs.
 * @param {number?} [size=4] - Tab-size.
 * @return {string} - Value without tabs.
 */
function detab(value, size) {
    var string = typeof value === 'string';
    var length = string && value.length;
    var characters = string && value.split('');
    var index = -1;
    var column = -1;
    var tabSize = size || 4;
    var character;
    var add;

    if (!string) {
        throw new Error('detab expected string');
    }

    while (++index < length) {
        character = characters[index];
        column++;

        if (character === TAB) {
            add = tabSize - (column % tabSize);
            characters[index] = repeat(SPACE, add);
            column += add - 1;
        } else if (character === NEWLINE) {
            column = -1;
        }
    }

    return characters.join('');
}

/*
 * Expose.
 */

module.exports = detab;

},{"repeat-string":2}],2:[function(require,module,exports){
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('repeat-string expects a string.');
  }

  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  }

  while (max > res.length && num > 0) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    if (!num) break;
    str += str;
  }

  return res.substr(0, max);
}

/**
 * Results cache
 */

var res = '';
var cache;

},{}]},{},[1])(1)
});