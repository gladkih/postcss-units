# postcss-units

[![Dependency Status](https://david-dm.org/gladkih/postcss-units.svg)](https://david-dm.org/gladkih/postcss-units) [![Build Status](https://travis-ci.org/gladkih/postcss-units.svg?branch=master)](https://travis-ci.org/gladkih/postcss-units)

<img align="right" width="100" height="100" title="Philosopher's stone, logo of PostCSS" src="http://postcss.github.io/postcss/logo.svg">

[PostCSS](https://github.com/postcss/postcss) plugin which generates rem or em when required

## Usage

Conversion from pixels into em or rem, depending on wrapper of value.

```css
// input
.title {
    margin: rem(-10px 8px);
    padding: 15px;
    font-size: rem(14px);
    line-height: rem(20);
}

// output
.title {
    margin: -0.625rem 0.5rem;
    padding: 15px;
    font-size: 0.88rem;
    line-height: 1.25rem;
}
```

```js
postcss([
    require('postcss-units')({
        size: 14,
        fallback: false,
        precision: 2
    })
])
```

## options

### size

Type: `Number`  
Default: 16

The `body` font size.

### fallback

Type: `Boolean`  
Default: false

Perform fallback `rem` for old browsers.

### precision

Type: `Number`  
Default: 3

Quantity of digits after decimal point for `em` and `rem`.


## Use with gulp-postcss

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
