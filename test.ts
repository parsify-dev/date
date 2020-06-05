import test from 'ava';
import {lightFormat, addDays} from 'date-fns';

import parsifyDatePlugin from './src';

test('general', async t => {
	const result = await parsifyDatePlugin()('17 days from now');

	if (result.includes(lightFormat(addDays(new Date(), 17), 'MM/dd/yyyy'))) {
		t.pass();
	}
});

test('allows setting a different date format', async t => {
	const result = await parsifyDatePlugin({format: 'yyyy/MM/dd'})('17 days from now');

	if (result.includes(lightFormat(addDays(new Date(), 17), 'yyyy/MM/dd'))) {
		t.pass();
	}
});

test('if the provided date format is invalid, fallback to default', async t => {
	const result = await parsifyDatePlugin({format: 'foo'})('17 days from now');

	if (result.includes(lightFormat(addDays(new Date(), 17), 'MM/dd/yyyy'))) {
		t.pass();
	}
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyDatePlugin()('foo / bar'), 'foo / bar');
	t.is(await parsifyDatePlugin()('1+2'), '1+2');
	t.is(await parsifyDatePlugin()('3'), '3');
	t.is(await parsifyDatePlugin()('10 years to days'), '10 years to days');
	t.is(await parsifyDatePlugin()('fasdfasfasftodayadffdas'), 'fasdfasfasftodayadffdas');
	t.is(await parsifyDatePlugin()('20 hours to minutes'), '20 hours to minutes');
});
