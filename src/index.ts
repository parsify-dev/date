// @ts-ignore
import * as date from '@akepinski/date.js';

import formatDate from './utils/format-date';

export default () => async (expression: string): Promise<string> => {
	if (/minutes?|from|last|months?|days?|today|next|weeks?|hours?|pm|am|monday|tuesday|wednesday|thursday|friday|saturday|sunday|night/.exec(expression)) {
		const result = date(expression);
		const formatted = formatDate(result);

		return formatted;
	}

	return expression;
};
