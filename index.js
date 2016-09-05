'use strict';

var extend = require('extend');
var postcss = require('postcss');
var valueParser = require('postcss-value-parser');

var funcExp = /(em\(|rem\()/;

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
    css.walkDecls(function(decl) {
      if (!funcExp.test(decl.value)) {
        return;
      }

      var fallback = false;

      var parsedValue = valueParser(decl.value).walk(function(node) {
        if (!isValidFunction(node)) {
          return;
        }

        var value = valueParser.unit(node.nodes[0].value);
        if (!isValidUnit(value)) {
          return;
        }

        var type = node.value;
        var number = Number(value.number);
        var size = convert(number, options);
        node.type = 'word';
        node.value = size + type;

        if (options.fallback && type === 'rem') {
          node.fallback = value.number + value.unit;
          fallback = true;
        }
      });

      decl.value = parsedValue.toString();

      if (fallback) {
        decl.cloneBefore({
          value: parsedValue.walk(function(node) {
            if (node.fallback) {
              node.value = node.fallback;
            }
          }).toString()
        });
      }
    });
  };
}

function isValidFunction(node) {
  var functions = {
    em: true,
    rem: true
  };
  return node.type === 'function' &&
         functions[node.value] &&
         node.nodes[0].type === 'word';
}

function isValidUnit(value) {
  return !value.unit || value.unit === 'px';
}

function convert(number, options) {
  return numberAfterPoint(number / options.size, options.precision);
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
