import { readSheet } from 'read-excel-file/node';

/**
 * @param {Buffer} workbook
 **/
export async function read_XLSX_server(workbook) {
	// TODO: Test what happens if we load an entirely empty workbook?
	/** @type {Partial<import('$lib/types').Workbook_Data>} */
	const data = {
		sheet_names: ['Info', 'Bibliography', 'Narrative']
	};

	data.info_rows = await readSheet(workbook, 'Info') ?? null;
	data.bib_rows = await readSheet(workbook, 'Bibliography') ?? null;
	data.narrative_rows = await readSheet(workbook, 'Narrative') ?? null;

	return /** @type {import('$lib/types').Workbook_Data} */ (data);
}
