'use strict';

import test from 'ava';
import postcssUnits from './';
import postcss from 'postcss';

function runPlugin(t, input, output, options) {
	options = options || {};
	return postcss([postcssUnits(options)]).process(input)
		.then(function(result) {
			t.same(result.css, output);
			t.same(result.warnings().length, 0);
		});
}

test('Change em with px', function(t) {
	var input = 'font-size: em(20px);';
	var output = 'font-size: 1.25em;';
	return runPlugin(t, input, output);
});

test('Change em without px', function(t) {
	var input = 'font-size: em(20);';
	var output = 'font-size: 1.25em;';
	return runPlugin(t, input, output);
});

test('Change rem with px', function(t) {
	var input = 'font-size: rem(20px);';
	var output = 'font-size: 1.25rem;';
	return runPlugin(t, input, output);
});

test('Change rem without px', function(t) {
	var input = 'font-size: rem(20);';
	var output = 'font-size: 1.25rem;';
	return runPlugin(t, input, output);
});

test('Change negative value', function(t) {
	var input = 'font-size: em(-20px);';
	var output = 'font-size: -1.25em;';
	return runPlugin(t, input, output);
});

test('Change with fallback', function(t) {
	var options = {
		fallback: true
	};
	var input = 'font-size: rem(20px);';
	var output = 'font-size: 20px;font-size: 1.25rem;';
	return runPlugin(t, input, output, options);
});

test('Precision ', function(t) {
	var options = {
		precision: 2
	};
	var input = 'font-size: rem(21px);';
	var output = 'font-size: 1.31rem;';
	return runPlugin(t, input, output, options);
});

test('Size equal 0', function(t) {
	var options = {
		size: 0
	};
	var input = 'font-size: rem(21px);';
	var output = 'font-size: 21rem;';
	return runPlugin(t, input, output, options);
});
