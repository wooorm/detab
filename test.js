'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var detab = require('./');
var assert = require('assert');

/*
 * Tests.
 */

describe('detab(value, size?)', function () {
    it('should throw when not given a string', function () {
        assert.throws(function () {
            detab(true);
        }, /detab expected string/);
    });

    it('should work', function () {
        assert.equal(detab('foo\tbar'), 'foo bar');
        assert.equal(detab('fo\tbar'), 'fo  bar');
        assert.equal(detab('f\tbar'), 'f   bar');
        assert.equal(detab('\tbar'), '    bar');
        assert.equal(detab('\t\tbar'), '        bar');
    });

    it('should support lines', function () {
        assert.equal(detab('foo\n\tbar'), 'foo\n    bar');
        assert.equal(detab('fo\n\tbar'), 'fo\n    bar');
        assert.equal(detab('f\n\tbar'), 'f\n    bar');
        assert.equal(detab('\n\tbar'), '\n    bar');
    });

    it('should accept `size`', function () {
        assert.equal(detab('foo\tbar', 2), 'foo bar');
        assert.equal(detab('fo\tbar', 2), 'fo  bar');
        assert.equal(detab('f\tbar', 2), 'f bar');
        assert.equal(detab('\tbar', 2), '  bar');
        assert.equal(detab('\t\tbar', 2), '    bar');
    });
});
