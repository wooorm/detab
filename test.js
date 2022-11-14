import assert from 'node:assert/strict'
import test from 'node:test'
import {detab} from './index.js'

/* eslint-disable no-await-in-loop */

const own = {}.hasOwnProperty

test('detab(value[, size])', function () {
  assert.throws(
    () => {
      // @ts-expect-error runtime
      detab(true)
    },
    /detab expected string/,
    'should throw when not given a string'
  )
})

test('should work', function () {
  assert.equal(detab('foo\tbar'), 'foo bar')
  assert.equal(detab('fo\tbar'), 'fo  bar')
  assert.equal(detab('f\tbar'), 'f   bar')
  assert.equal(detab('\tbar'), '    bar')
  assert.equal(detab('\t\tbar'), '        bar')
  assert.equal(detab('al\t\tbar'), 'al      bar')
  assert.equal(detab('bar\t\t'), 'bar     ')
})

const map = {
  LF: '\n',
  CR: '\r',
  'CR+LF': '\r\n'
}
/** @type {keyof map} */
let key

for (key in map) {
  if (own.call(map, key)) {
    const chars = map[key]

    await test(key, function () {
      assert.equal(detab('foo' + chars + '\tbar'), 'foo' + chars + '    bar')
      assert.equal(detab('fo' + chars + '\tbar'), 'fo' + chars + '    bar')
      assert.equal(detab('f' + chars + '\tbar'), 'f' + chars + '    bar')
      assert.equal(detab(chars + '\tbar'), chars + '    bar')
      assert.equal(detab('al\t' + chars + '\tbar'), 'al  ' + chars + '    bar')
      assert.equal(detab('bar' + chars + '\t'), 'bar' + chars + '    ')
      assert.equal(detab('bar\t' + chars), 'bar ' + chars)
    })
  }
}

/* eslint-enable no-await-in-loop */
