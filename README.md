# postcss-units
[![Dependency Status](https://david-dm.org/gladkih/postcss-units.svg)](https://david-dm.org/gladkih/postcss-units) [![devDependency Status](https://david-dm.org/gladkih/postcss-units/dev-status.svg)](https://david-dm.org/gladkih/postcss-units#info=devDependencies) [![Build Status](https://travis-ci.org/gladkih/postcss-units.svg?branch=master)](https://travis-ci.org/gladkih/postcss-units)

[PostCSS](https://github.com/postcss/postcss) plugin which generates rem or em when required

<img align="right" width="100" height="100"      title="Philosopher's stone, logo of PostCSS"      src="http://postcss.github.io/postcss/logo.svg">

## Usage
Conversion from pixels into em or rem, depending on wrapper of value.

```css
// input
.title {
    margin: -10px .5em;
    padding: 15px;
    font-size: rem(14px);
    line-height: rem(20);
}

// output
.title {
    margin: -10px .5em;
    padding: 15px;
    font-size: 0.88rem;
    line-height: 1.25rem;
}
```

### Example

```js
'use strict';

var fs = require('fs');
var postcss = require('postcss');
var postcssUnits = require('postcss-units');
var css = fs.readFileSync('style.css', 'utf8');

var options = {
    size: 14,
    fallback: false,
    precision: 2
};

var resultCss = postcss(postcssUnits(options)).process(css).css;

fs.writeFile('style-result.css', resultCss, function(err) {
    if (err) {
        throw err;
    }
    console.log('File written.');
});
```

### options
Type: `Object | Null`<br>Default:

```js
{
    size: 16,
    fallback: false,
    precision: 3
}
```

- `size` (Number) The `body` font size.
- `fallback` (Number) perform fallback `rem` for old browsers.
- `precision` (Array) quantity of digits after decimal point for `em` and `rem`.

### Use with gulp-postcss

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcssUnits = require('postcss-units');

gulp.task('css', function () {

    var processors = [
        postcssUnits({
            size: 14
        })
    ];
    return gulp.src(['build/static/css/**/*.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest('build/static/css'));
});
```

## License
MIT © [Maxim Gladkih](https://gladkih.su)
