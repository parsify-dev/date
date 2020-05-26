// @ts-expect-error
import * as sherlock from 'sherlockjs';

import formatDate from './utils/format-date';

const allowed = /minutes?|from|last|months?|days?|today|next|weeks?|hours?|pm|am|monday|tuesday|wednesday|thursday|friday|saturday|sunday|night|morning|january|february|march|april|may|june|july|august|september|october|november|december/;
const banned = / in | to |\+|-|\/|\*/;

export default () => async (expression: string): Promise<string> => {
	if (allowed.exec(expression) && !banned.exec(expression)) {
		const result = sherlock.parse(expression);

		if (!result.startDate) {
			return expression;
		}

		return formatDate(result.startDate);
	}

	return expression;
};
