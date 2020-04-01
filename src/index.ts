// @ts-ignore
import * as create from 'sugar/date/create';

import formatDate from './utils/format-date';

export default () => async (expression: string): Promise<string> => {
	const result = create(expression);
	const formatted = formatDate(result);

	if (formatted === 'invalid' || formatted.includes('NaN')) {
		return expression;
	}

	return formatted;
};
