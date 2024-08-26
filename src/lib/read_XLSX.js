import readXlsxFile, { readSheetNames } from 'read-excel-file';
import {
	required_entry_keys,
	required_info_keys,
	required_narrative_keys,
	required_sheet_names
} from './constants';

/** @typedef {string | number | boolean | typeof Date} Cell */

/**
 * @param {ArrayBuffer} workbook
 * @returns {Promise<import('$lib/types').Read_XLSX_Result>}
 **/
export async function read_XLSX(workbook) {
	const loaded_sheet_names = await readSheetNames(workbook);
	const missing_sheet_names = [];

	for (const required_sheet_name of required_sheet_names) {
		if (!loaded_sheet_names.includes(required_sheet_name))
			missing_sheet_names.push(required_sheet_name);
	}

	/** @type {string[]} */
	const errors = [];

	if (missing_sheet_names.length > 0)
		errors.push(`File missing sheets: ${missing_sheet_names.join(', ')}`);

	/** @type {import('$lib/types').Info} */
	const info = {};

	if (loaded_sheet_names.includes('Info')) {
		const info_rows = await readXlsxFile(workbook, { sheet: 'Info' });

		for (const key of required_info_keys) {
			const row = info_rows.find((r) => r[0] == key);

			if (row === undefined) {
				errors.push(`"${key}" row is missing from "Info" sheet`);
				continue;
			}

			info[key] = actual_string_or_null(row[1]);
		}
	}

	/** @type {import('$lib/types').Entry[]} */
	let entries = [];

	if (loaded_sheet_names.includes('Bibliography')) {
		const bib_rows = await readXlsxFile(workbook, { sheet: 'Bibliography' });

		const result = process_bib_rows(bib_rows);

		if (result.ok) {
			entries = result.entries;
		} else {
			errors.push(...result.errors);
		}
	}

	const narrative = [];

	if (loaded_sheet_names.includes('Narrative')) {
		const narrative_rows = await readXlsxFile(workbook, { sheet: 'Narrative' });
		const header_row = narrative_rows[0];

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

			const sections = narrative_rows.slice(1);

			if (can_process_narrative_rows) {
				/** @type {Partial<import('$lib/types').Narrative_Section>} */
				const new_section = {};

				for (const section of sections) {
					for (const [key, offset] of required_narrative_keys_with_offsets) {
						const value = section[offset];

						if (key == 'Heading') new_section.Heading = actual_string_or_null(value);
						// TODO: Handle markdown
						if (key == 'Content') new_section.Content = actual_string_or_null(value);
						if (key === 'Related source titles')
							new_section['Related source titles'] = cell_to_tags(value);
					}
				}

				narrative.push(/** @type {import('$lib/types').Narrative_Section} */ (new_section));
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

    // Validate narrative section title references

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
			narrative
		}
	};
}

/** @param {unknown} value */
function actual_string_or_null(value) {
	if (typeof value !== 'string') return null;

	const v = value.trim();

	if (!v || v === '') return null;

	return v;
}

/**
 * @param {import('read-excel-file').Row[]} rows
 * @returns {import('$lib/types').Bib_Rows_Result}
 */
function process_bib_rows(rows) {
	console.log(rows);
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

	for (const key of required_entry_keys) {
		const offset = header_row.findIndex((c) => c === key);

		if (offset === -1) {
			errors.push(`The "Bibliography" sheet is missing a required column: ${key}`);
			can_process_bib_rows = false;

			continue;
		}

		required_keys_with_column_offsets.push([key, offset]);
	}

	const user_defined_keys_with_column_offsets = /** @type {[string, number][]} */ (
		header_row
            // @ts-ignore
			.filter((v) => !required_entry_keys.includes(actual_string_or_null(v)))
			.map((v) => {
				return [v, header_row.findIndex((c) => c === v)];
			})
	);

	if (can_process_bib_rows) {
		const merged_keys = [
			...required_keys_with_column_offsets,
			...user_defined_keys_with_column_offsets
		];

		for (const row of entry_rows) {
			/** @type {Partial<import('$lib/types').Entry>} */
			const entry = {};

			for (const [key, offset] of merged_keys) {
				const value = row[offset];

				if (key === 'Tags') {
					entry[key] = cell_to_tags(value);
				} else {
					entry[key] = actual_string_or_null(value);
				}
			}

			entries.push(/** @type {import('$lib/types').Entry} */ (entry));
		}
	}

	if (errors.length > 0)
		return {
			ok: false,
			errors: errors
		};

	return {
		ok: true,
		entries
	};
}

/** @param {Cell} cell */
function cell_to_tags(cell) {
	if (!cell || typeof cell !== 'string') return [];

	return cell.split(';').map((v) => v.trim());
}
