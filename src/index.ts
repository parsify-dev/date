import {parseDate} from 'chrono-node';
import {lightFormat} from 'date-fns';

interface Options {
	format?: string;
}

export default ({format}: Options = {}) => async (expression: string): Promise<string> => {
	const result = parseDate(expression);

	if (!result) {
		return expression;
	}

	// Fallback to default format
	try {
		if (format) {
			return lightFormat(result, format);
		}

		return new Date(result).toLocaleString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
	} catch {
		return new Date(result).toLocaleString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
	}
};
