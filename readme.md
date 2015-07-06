# fault [![Build Status](https://img.shields.io/travis/wooorm/fault.svg?style=flat)](https://travis-ci.org/wooorm/fault) [![Coverage Status](https://img.shields.io/coveralls/wooorm/fault.svg?style=flat)](https://coveralls.io/r/wooorm/fault?branch=master)

Functional errors with formatted output.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install detab
```

**detab** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), [duo](http://duojs.org/#getting-started),
and for AMD, CommonJS, and globals ([uncompressed](detab.js) and
[compressed](detab.min.js)).

## Usage

Dependencies.

```javascript
var detab = require('detab');
```

Create a normal error and format a string:

```javascript
var four = detab('\tfoo\nbar\tbaz');
var two = detab('\tfoo\nbar\tbaz', 2);
var eight = detab('\tfoo\nbar\tbaz', 8);
```

Yields:

```text
    foo
bar baz
```

```text
  foo
bar baz
```

```text
        foo
bar     baz
```

## API

### detab(value\[, size\])

Replace tabs with spaces, being smart about which column the tab is at
and which size should be used.

Parameters:

*   `value` (`string`) — Value with tabs;
*   `size` (`number`, default: `4`) — Tab-size.

Returns: `string` — Value without tabs

## License

[MIT](LICENSE) @ [Titus Wormer](http://wooorm.com)
