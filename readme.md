# detab

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Detab: tabs → spaces.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install detab
```

## Use

```js
import {detab} from 'detab'

console.log(detab('\tfoo\nbar\tbaz'))
console.log(detab('\tfoo\nbar\tbaz', 2))
console.log(detab('\tfoo\nbar\tbaz', 8))
```

Yields:

```txt
    foo
bar baz
```

```txt
  foo
bar baz
```

```txt
        foo
bar     baz
```

## API

This package exports the following identifiers: `detab`.
There is no default export.

### `detab(value[, size=4])`

Replace tabs with spaces in `value` (`string`), being smart about which column
the tab is at and which `size` (`number`, default: `4`) should be used.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/detab/workflows/main/badge.svg

[build]: https://github.com/wooorm/detab/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/detab.svg

[coverage]: https://codecov.io/github/wooorm/detab

[downloads-badge]: https://img.shields.io/npm/dm/detab.svg

[downloads]: https://www.npmjs.com/package/detab

[size-badge]: https://img.shields.io/bundlephobia/minzip/detab.svg

[size]: https://bundlephobia.com/result?p=detab

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
