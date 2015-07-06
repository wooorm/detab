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
