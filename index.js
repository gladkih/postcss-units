'use strict';

var extend = require('extend');
var regular = /(\brem\(|\bem\()(:?\-|)(\d*\.?\d+)?(px|)(\))/ig;
var regularNumber = /(:?\-|)\d*\.?\d+/;
var regularType = /\brem|\bem/;
var postcss = require('postcss');

function postcssUnits(options) {
  options = extend({
    size: 16,
    fallback: false,
    precision: 3
  }, options);

  if (options.size === 0) {
    options.size = 1;
  }

  return function(css) {

    css.walkDecls(function(decl, i) {
      var value = decl.value;
      var parsing = value.match(regular);
      var type;

      if (parsing) {
        options.elementSize = parsing[0].match(regularNumber)[0];
        type = parsing[0].match(regularType)[0];

        switch (type) {
          case 'rem':
            typeRem(decl, options, i);
            break;
          case 'em':
            typeEm(decl, options);
            break;
        }
      }
    });
  };
}

/**
 * Change from em(«number») to «number»em
 * @param decl
 * @param options - replace options
 */
function typeEm(decl, options) {
  var size = getSize(options);
  decl.value = decl.value.replace(regular, size + 'em');
}

/**
 * Change from rem(«number») to «number»rem
 * @param decl
 * @param options - replace options
 * @param ruleNumber - number of rules in order
 */
function typeRem(decl, options, ruleNumber) {
  var size = getSize(options);
  var value = decl.value.replace(regular, size + 'rem');

  if (options.fallback) {
    decl.value = decl.value.replace(regular, options.elementSize + 'px');
    decl.parent.insertAfter(ruleNumber, decl.clone({
      value: value
    }));
  } else {
    decl.value = value;
  }

}

function getSize(options) {
  var size = options.elementSize / options.size;
  return numberAfterPoint(size, options.precision);
}

/**
 * The function for rounding of numbers after the decimal point
 * @param number the original number
 * @param precision how many decimal places should be
 * @returns {number} final number
 */
function numberAfterPoint(number, precision) {
  var multiplier = Math.pow(10, precision + 1);
  var fullNumber = Math.floor(number * multiplier);
  return Math.round(fullNumber / 10) * 10 / multiplier;
}

module.exports = postcss.plugin('postcss-units', postcssUnits);
