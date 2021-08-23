import test from 'tape'
import {detab} from './index.js'

const own = {}.hasOwnProperty

test('detab(value[, size])', (t) => {
  t.throws(
    () => {
      // @ts-expect-error runtime
      detab(true)
    },
    /detab expected string/,
    'should throw when not given a string'
  )

  t.test('should work', (t) => {
    t.equal(detab('foo\tbar'), 'foo bar')
    t.equal(detab('fo\tbar'), 'fo  bar')
    t.equal(detab('f\tbar'), 'f   bar')
    t.equal(detab('\tbar'), '    bar')
    t.equal(detab('\t\tbar'), '        bar')
    t.equal(detab('al\t\tbar'), 'al      bar')
    t.equal(detab('bar\t\t'), 'bar     ')
    t.end()
  })

  t.test('should support lines', (t) => {
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

        t.test(key, (t) => {
          t.equal(detab('foo' + chars + '\tbar'), 'foo' + chars + '    bar')
          t.equal(detab('fo' + chars + '\tbar'), 'fo' + chars + '    bar')
          t.equal(detab('f' + chars + '\tbar'), 'f' + chars + '    bar')
          t.equal(detab(chars + '\tbar'), chars + '    bar')
          t.equal(detab('al\t' + chars + '\tbar'), 'al  ' + chars + '    bar')
          t.equal(detab('bar' + chars + '\t'), 'bar' + chars + '    ')
          t.equal(detab('bar\t' + chars), 'bar ' + chars)
          t.end()
        })
      }
    }

    t.end()
  })

  t.end()
})
