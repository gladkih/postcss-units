'use strict';

var fs = require('fs');
var postcss = require('postcss');
var postcssUnits = require('..');
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
