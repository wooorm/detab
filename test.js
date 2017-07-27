'use strict';

var test = require('tape');
var detab = require('./');

test('detab(value[, size])', function (t) {
  t.throws(
    function () {
      detab(true);
    },
    /detab expected string/,
    'should throw when not given a string'
  );

  t.test('should work', function (st) {
    st.equal(detab('foo\tbar'), 'foo bar');
    st.equal(detab('fo\tbar'), 'fo  bar');
    st.equal(detab('f\tbar'), 'f   bar');
    st.equal(detab('\tbar'), '    bar');
    st.equal(detab('\t\tbar'), '        bar');
    st.equal(detab('al\t\tbar'), 'al      bar');
    st.equal(detab('bar\t\t'), 'bar     ');
    st.end();
  });

  t.test('should support lines', function (st) {
    var map = {
      LF: '\n',
      CR: '\r',
      'CR+LF': '\r\n'
    };

    Object.keys(map).forEach(function (name) {
      var chars = map[name];

      st.test(name, function (sst) {
        sst.equal(detab('foo' + chars + '\tbar'), 'foo' + chars + '    bar');
        sst.equal(detab('fo' + chars + '\tbar'), 'fo' + chars + '    bar');
        sst.equal(detab('f' + chars + '\tbar'), 'f' + chars + '    bar');
        sst.equal(detab(chars + '\tbar'), chars + '    bar');
        sst.equal(detab('al\t' + chars + '\tbar'), 'al  ' + chars + '    bar');
        sst.equal(detab('bar' + chars + '\t'), 'bar' + chars + '    ');
        sst.equal(detab('bar\t' + chars), 'bar ' + chars);
        sst.end();
      });
    });

    st.end();
  });

  t.end();
});
