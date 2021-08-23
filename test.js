import test from 'tape'
import {detab} from './index.js'

const own = {}.hasOwnProperty

test('detab(value[, size])', (t) => {
  t.throws(
    () => {
      // @ts-ignore runtime
      detab(true)
    },
    /detab expected string/,
    'should throw when not given a string'
  )

  t.test('should work', (st) => {
    st.equal(detab('foo\tbar'), 'foo bar')
    st.equal(detab('fo\tbar'), 'fo  bar')
    st.equal(detab('f\tbar'), 'f   bar')
    st.equal(detab('\tbar'), '    bar')
    st.equal(detab('\t\tbar'), '        bar')
    st.equal(detab('al\t\tbar'), 'al      bar')
    st.equal(detab('bar\t\t'), 'bar     ')
    st.end()
  })

  t.test('should support lines', (st) => {
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

        st.test(key, (sst) => {
          sst.equal(detab('foo' + chars + '\tbar'), 'foo' + chars + '    bar')
          sst.equal(detab('fo' + chars + '\tbar'), 'fo' + chars + '    bar')
          sst.equal(detab('f' + chars + '\tbar'), 'f' + chars + '    bar')
          sst.equal(detab(chars + '\tbar'), chars + '    bar')
          sst.equal(detab('al\t' + chars + '\tbar'), 'al  ' + chars + '    bar')
          sst.equal(detab('bar' + chars + '\t'), 'bar' + chars + '    ')
          sst.equal(detab('bar\t' + chars), 'bar ' + chars)
          sst.end()
        })
      }
    }

    st.end()
  })

  t.end()
})
