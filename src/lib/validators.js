/** @type {import('$lib/types').Cell_Validator<string | null>} */

/**
 * @param {import('$lib/types').Cell} cell
 * @returns {{ok: true, value: null | string}}
 **/
export function string_or_null(cell) {
	if (typeof cell !== 'string') {
		return {
			ok: true,
			value: null
		};
	}

	const v = cell.trim();

	if (!v || v === '')
		return {
			ok: true,
			value: null
		};

	return {
		ok: true,
		value: v
	};
}

/** @type {import('$lib/types').Cell_Validator<string>} */
export function string_or_error(cell) {
	if (cell instanceof Date) {
		return {
			ok: true,
			value: cell.toLocaleDateString()
		};
	}

	if (typeof cell == 'number') {
		return {
			ok: true,
			value: '' + cell
		};
	}

	if (typeof cell !== 'string' || cell.length == 0)
		return {
			ok: false,
			message: `Received "${cell}" but need it to be text`
		};

	return {
		ok: true,
		value: cell
	};
}

/**
 * @param {import('$lib/types').Cell} cell
 **/
export function tags(cell) {
	if (!cell || typeof cell !== 'string')
		return {
			ok: true,
			value: []
		};

	// TODO: Feels like a bunch could go wrong here
	return {
		ok: true,
		value: cell.split(';').map((v) => v.trim())
	};
}

/** @param {import('$lib/types').Cell} cell **/
export function valid_date(cell) {
	if (cell instanceof Date)
		return {
			ok: true,
			value: /** @type {Date} */ (cell)
		};

	return {
		ok: false,
		// TODO: Include necessary format in message
		message: `${cell} is not a valid date`
	};
}
