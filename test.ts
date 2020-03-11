import test from 'ava';
import {lightFormat, addDays} from 'date-fns';

import parsifyDatePlugin from './src';

test('general', async t => {
	const result = await parsifyDatePlugin()('today + 17 days');

	t.is(result, lightFormat(addDays(new Date(), 17), 'MM/dd/yyyy'));
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyDatePlugin()('foo / bar'), 'foo / bar');
	t.is(await parsifyDatePlugin()('1+2'), '1+2');
	t.is(await parsifyDatePlugin()('3'), '3');
});
