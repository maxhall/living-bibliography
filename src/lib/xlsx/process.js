import {
	coordinate_or_null,
	string_or_error,
	string_or_null,
	tags,
	valid_date
} from './validators';
import { parse_content_to_markdown } from '$lib/utils';

export const required_info_keys = /** @type {const} */ ([
	['Title', string_or_error],
	['Subtitle', string_or_null],
	['Authorship', string_or_null]
]);

export const required_sheet_names = /** @type {const} */ (['Info', 'Bibliography', 'Narrative']);

export const required_narrative_keys = /** @type {const} */ ([
	'Heading',
	'Content',
	'Related source titles'
]);

export const required_entry_keys = /** @type {const} */ ([
	['Title', string_or_error],
	['Publisher', string_or_error],
	['Date', string_or_error],
	['Annotation', string_or_null],
	['Tags', tags],
	['Link', string_or_null],
	['Date added to bibliography', valid_date],
	['Latitude', coordinate_or_null],
	['Longitude', coordinate_or_null]
]);

/**
 * @param {import('$lib/types').Workbook_Data} data
 * @returns {Promise<import('$lib/types').Process_XLSX_Result>}
 **/
export async function process_XLSX(data) {
	const missing_sheet_names = [];

	for (const required_sheet_name of required_sheet_names) {
		if (!data.sheet_names.includes(required_sheet_name))
			missing_sheet_names.push(required_sheet_name);
	}

	/** @type {string[]} */
	const errors = [];

	if (missing_sheet_names.length > 0)
		errors.push(`File missing sheets: ${missing_sheet_names.join(', ')}`);

	/** @type {import('$lib/types').Info} */
	const info = {};

	if (data.info_rows) {
		for (const [key, validator] of required_info_keys) {
			const row = data.info_rows.find((r) => r[0] == key);

			if (row === undefined) {
				errors.push(`A row with "${key}" in the first column is missing from the "Info" sheet`);
				continue;
			}

			const result = validator(row[1]);

			if (result.ok) {
				info[key] = result.value;
				continue;
			}

			errors.push(result.message);
		}
	}

	/** @type {import('$lib/types').Entry[]} */
	let entries = [];
	/** @type {string[]} */
	let author_defined_bibliography_keys = [];

	if (data.bib_rows) {
		const result = process_bib_rows(data.bib_rows);

		if (result.ok) {
			entries = result.entries;
			author_defined_bibliography_keys = result.author_defined_bibliography_keys;
		} else {
			errors.push(...result.errors);
		}
	}

	/** @type {import('$lib/types').Narrative_Section[]} */
	const narrative = [];

	if (data.narrative_rows) {
		const header_row = data.narrative_rows[0];

		if (header_row) {
			/** @type {[key: string, offset: number][]} */
			const required_narrative_keys_with_offsets = [];

			let can_process_narrative_rows = true;

			for (const key of required_narrative_keys) {
				const offset = header_row.findIndex((c) => c === key);

				if (offset === -1) {
					errors.push(`The "Narrative" sheet is missing a required column: ${key}`);
					can_process_narrative_rows = false;

					continue;
				}

				required_narrative_keys_with_offsets.push([key, offset]);
			}

			const sections = data.narrative_rows.slice(1);

			if (can_process_narrative_rows) {
				for (const section of sections) {
					/** @type {Partial<import('$lib/types').Narrative_Section>} */
					const new_section = {};

					for (const [key, offset] of required_narrative_keys_with_offsets) {
						const value = section[offset];

						if (key == 'Heading') new_section.Heading = string_or_null(value).value;
						if (key == 'Content')
							new_section['Markdown content'] = parse_content_to_markdown(value);
						if (key === 'Related source titles')
							new_section['Related source titles'] = tags(value).value;
					}

					narrative.push(/** @type {import('$lib/types').Narrative_Section} */ (new_section));
				}
			}
		} else {
			errors.push('The "Narrative" sheet has no header row');
		}
	}

	const entries_with_duplicate_titles = entries.filter((a) => {
		return entries.filter((b) => b.Title === a.Title).length > 1;
	});

	if (entries_with_duplicate_titles.length > 0)
		errors.push(
			`Titles in the "Bibliography" must be unique. Titles with duplicates: ${Array.from(new Set([...entries_with_duplicate_titles.map((e) => e.Title)])).join(', ')}`
		);

	// TODO: Validate narrative section title references
	// TODO: Validate there's lat value whereve a long is present and vice versus
	// TODO: Check narrative headings are unique so I can hash them for anchors
	// TODO: Prevent duplicate tags

	if (errors.length > 0)
		return {
			ok: false,
			errors
		};

	return {
		ok: true,
		data: {
			info,
			entries,
			narrative,
			author_defined_bibliography_keys
		}
	};
}

/**
 * @param {import('read-excel-file').Row[]} rows
 * @returns {import('$lib/types').Bib_Rows_Result}
 */
function process_bib_rows(rows) {
	/** @type {import('$lib/types').Entry[]} */
	const entries = [];
	const header_row = rows[0];
	const entry_rows = rows.slice(1);

	if (!header_row)
		return {
			ok: false,
			errors: ['The "Bibliography" sheet has no header row']
		};

	let can_process_bib_rows = true;

	/** @type {string[]} */
	const errors = [];

	if (entry_rows.length == 0) {
		can_process_bib_rows = false;
		errors.push(`The "Bibliography" sheet has no entries.`);
	}

	/** @type {[key: string, offset: number][]} */
	const required_keys_with_column_offsets = [];

	for (const [key] of required_entry_keys) {
		const offset = header_row.findIndex((c) => c === key);

		if (offset === -1) {
			errors.push(`The "Bibliography" sheet is missing a required column: ${key}`);
			can_process_bib_rows = false;

			continue;
		}

		required_keys_with_column_offsets.push([key, offset]);
	}

	const author_defined_keys_with_column_offsets = /** @type {[string, number][]} */ (
		header_row
			.filter((v) => {
				const result = string_or_null(v);

				if (!result.ok) return false;

				// @ts-ignore
				const is_required_key = required_entry_keys.map((k) => k[0]).includes(result.value);

				return !is_required_key;
			})
			.map((v) => {
				return [v, header_row.findIndex((c) => c === v)];
			})
	);

	if (can_process_bib_rows) {
		const merged_keys = [
			...required_keys_with_column_offsets,
			...author_defined_keys_with_column_offsets
		];

		for (let i = 0; i < entry_rows.length; i++) {
			const row = entry_rows[i];

			/** @type {Partial<import('$lib/types').Entry>} */
			const entry = {};

			for (const [key, offset] of merged_keys) {
				const cell = row[offset];
				const validator = required_entry_keys.find((k) => k[0] == key)?.at(1) ?? string_or_null;
				const result = validator(cell);

				if (result.ok) {
					entry[key] = result.value;
					continue;
				}

				errors.push(
					`Could not find a value in the required "${key}" column of row ${i + 2} of the "Bibliography" sheet. (${result.message})`
				);
			}

			entries.push(/** @type {import('$lib/types').Entry} */ (entry));
		}
	}

	if (errors.length > 0) {
		console.log(errors);

		return {
			ok: false,
			errors: errors
		};
	}

	return {
		ok: true,
		entries,
		author_defined_bibliography_keys: author_defined_keys_with_column_offsets.map((d) => d[0])
	};
}
