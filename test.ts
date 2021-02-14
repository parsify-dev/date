import test from 'ava';
import {lightFormat, addDays} from 'date-fns';

import parsifyDatePlugin from './src';

test('general', async t => {
    const result = await parsifyDatePlugin()('17 days from now');

    t.is(result, new Date(addDays(new Date(), 17)).toLocaleString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}));
});

test('allows setting a different date format', async t => {
	const result = await parsifyDatePlugin({format: 'yyyy/MM/dd'})('17 days from now');

    t.is(result, lightFormat(addDays(new Date(), 17), 'yyyy/MM/dd'));
});

test('if the provided date format is invalid, fallback to default', async t => {
	const result = await parsifyDatePlugin({format: 'foo'})('17 days from now');

    t.is(result, new Date(addDays(new Date(), 17)).toLocaleString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}));
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyDatePlugin()('foo / bar'), 'foo / bar');
	t.is(await parsifyDatePlugin()('round(1 month in days)'), 'round(1 month in days)');
	t.is(await parsifyDatePlugin()('1+2'), '1+2');
	t.is(await parsifyDatePlugin()('3'), '3');
    t.is(await parsifyDatePlugin()('fasdfasfasftodayadffdas'), 'fasdfasfasftodayadffdas');
    t.is(await parsifyDatePlugin()('3 weeks in days'), '3 weeks in days');
});
