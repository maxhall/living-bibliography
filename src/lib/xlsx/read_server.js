import readXlsxFileNode, { readSheetNames as readSheetNamesNode } from 'read-excel-file/node';

/**
 * @param {Buffer} workbook
 **/
export async function read_XLSX_server(workbook) {
	// TODO: Test what happens if we load an entirely empty workbook?
	const sheet_names = await readSheetNamesNode(workbook);

	/** @type {Partial<import('$lib/types').Workbook_Data>} */
	const data = {
		sheet_names
	};

	data.info_rows = sheet_names.includes('Info')
		? await readXlsxFileNode(workbook, { sheet: 'Info' })
		: null;

	data.bib_rows = sheet_names.includes('Bibliography')
		? await readXlsxFileNode(workbook, { sheet: 'Bibliography' })
		: null;

	data.narrative_rows = sheet_names.includes('Narrative')
		? await readXlsxFileNode(workbook, { sheet: 'Narrative' })
		: null;

	return /** @type {import('$lib/types').Workbook_Data} */ (data);
}
