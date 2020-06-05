// @ts-expect-error
import * as sherlock from 'sherlockjs';
import {lightFormat} from 'date-fns';

interface Options {
	format?: string;
}

const allowed = /minutes?|from|last|months?|days?|today|next|weeks?|hours?|pm|am|monday|tuesday|wednesday|thursday|friday|saturday|sunday|night|morning|january|february|march|april|may|june|july|august|september|october|november|december/;
const banned = /[*+-/]/;

export default ({format}: Options = {}) => async (expression: string): Promise<string> => {
	if (allowed.exec(expression) && !banned.exec(expression)) {
		const result = sherlock.parse(expression);

		if (!result.startDate) {
			return expression;
		}

		// Fallback to default format
		try {
			return lightFormat(result.startDate, format ?? 'MM/dd/yyyy HH:mm');
		} catch {
			return lightFormat(result.startDate, 'MM/dd/yyyy HH:mm');
		}
	}

	return expression;
};
