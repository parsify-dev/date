// @ts-expect-error
import * as sherlock from 'sherlockjs';

import formatDate from './utils/format-date';

export default () => async (expression: string): Promise<string> => {
	const result = sherlock.parse(expression);

	if (!result.startDate || expression.length < 3) {
		return expression;
	}

	const formatted = formatDate(result.startDate);

	return formatted;
};
