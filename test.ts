import test from 'ava';
import {lightFormat, addDays} from 'date-fns';

import parsifyDatePlugin from './src';
import formatDate from './src/utils/format-date';

test('general', async t => {
	const result = await parsifyDatePlugin()('17 days from now');

	if (result.includes(lightFormat(addDays(new Date(), 17), 'MM/dd/yyyy'))) {
		t.pass();
	}
});

test('formats minutes correctly', t => {
	const fakeDate = new Date('Wed Apr 01 2020 21:05:44 GMT+0200 (Central European Summer Time)');
	const result = formatDate(fakeDate);

	t.is(result, '04/01/2020 21:05');
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyDatePlugin()('foo / bar'), 'foo / bar');
	t.is(await parsifyDatePlugin()('1+2'), '1+2');
	t.is(await parsifyDatePlugin()('3'), '3');
});
