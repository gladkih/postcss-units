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
					default:
						break;
				}
			}
		});
	};
}

/**
 * * Замена em(«число») на «число»em
 * @param decl — параметры замены
 * @param options
 */
function typeEm(decl, options) {
	var size = numberAfterPoint(options.elementSize / options.size, options.precision);
	decl.value = decl.value.replace(regular, size + 'em');
}

/**
 * Замена rem(«число») на «число»rem
 * @param decl
 * @param options — параметры замены
 * @param ruleNumber — номер правила по порядку
 */
function typeRem(decl, options, ruleNumber) {
	var size = numberAfterPoint(options.elementSize / options.size, options.precision);
	var value = decl.value.replace(regular, size + 'rem');

	if (options.fallback) {
		decl.value = decl.value.replace(regular, options.elementSize + 'px');
		decl.parent.insertAfter(ruleNumber, decl.clone({value: value}));
	} else {
		decl.value = value;
	}

}

/**
 * Функция для округления чисел после запятой
 * @param number исходное число
 * @param precision сколько знаков после запятой должно быть
 * @returns {number} итоговое число
 */
function numberAfterPoint(number, precision) {
	var multiplier = Math.pow(10, precision + 1);
	var fullNumber = Math.floor(number * multiplier);
	return Math.round(fullNumber / 10) * 10 / multiplier;
}

module.exports = postcss.plugin('postcss-units', postcssUnits);
