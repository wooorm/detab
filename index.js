'use strict'

import repeat from 'repeat-string'

var search = /[\t\n\r]/g

/***
 * Replace tabs with spaces, being smart about which column the tab is at and
 * which size should be used.
 *
 * @param {string} value Value with tabs
 * @param {number} [tabSize=4] Tab size
 * @returns {string} Value with spaces
 */
export function detab(value, tabSize = 4) {
  var result = []
  var start = 0
  var index = 0
  var column = -1
  var add
  var match
  var end

  if (typeof value !== 'string') {
    throw new TypeError('detab expected string')
  }

  while (index < value.length) {
    search.lastIndex = index
    match = search.exec(value)
    end = match ? match.index : value.length

    if (value.charCodeAt(end) === 9) {
      add = tabSize - ((column + end - index + 1) % tabSize)
      result.push(value.slice(start, end), repeat(' ', add))
      column += end - index + add
      start = end + 1
    } else {
      column = -1
    }

    index = end + 1
  }

  result.push(value.slice(start))

  return result.join('')
}
