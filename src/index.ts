// @ts-ignore
import * as create from 'sugar/date/create';

import formatDate from './utils/format-date';

export default () => async (expression: string): Promise<string> => {
	if (/^\d+$/.test(expression)) {
		return expression;
	}

	const result = create(expression);
	const formatted = formatDate(result);

	if (formatted.includes('NaN')) {
		return expression;
	}

	return formatted;
};
