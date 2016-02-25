# postcss-units
[![Dependency Status](https://david-dm.org/gladkih/postcss-units.svg)](https://david-dm.org/gladkih/postcss-units) [![devDependency Status](https://david-dm.org/gladkih/postcss-units/dev-status.svg)](https://david-dm.org/gladkih/postcss-units#info=devDependencies) [![Build Status](https://travis-ci.org/gladkih/postcss-units.svg?branch=master)](https://travis-ci.org/gladkih/postcss-units)

[PostCSS](https://github.com/postcss/postcss) plugin that generates rem em or necessary.
## Usage
Conversion of pixels em or rem, depending on the wrapper.

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
- `fallback` (Number) do fallback `rem` for older browsers.
- `precision` (Array) the number of digits after the decimal point for the `em` and` rem`.

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
MIT ©[Maxim Gladkih](https://gladkih.su)
