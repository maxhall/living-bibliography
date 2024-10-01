import readXlsxFileBrowser, { readSheetNames as readSheetNamesBrowser } from 'read-excel-file';

/**
 * @param {ArrayBuffer} workbook
 **/
export async function read_XLSX_browser(workbook) {
	// TODO: Test what happens if we load an entirely empty workbook?
	const sheet_names = await readSheetNamesBrowser(workbook);

	/** @type {Partial<import('$lib/types').Workbook_Data>} */
	const data = {
		sheet_names
	};

	data.info_rows = sheet_names.includes('Info')
		? await readXlsxFileBrowser(workbook, { sheet: 'Info' })
		: null;

	data.bib_rows = sheet_names.includes('Bibliography')
		? await readXlsxFileBrowser(workbook, { sheet: 'Bibliography' })
		: null;

	data.narrative_rows = sheet_names.includes('Narrative')
		? await readXlsxFileBrowser(workbook, { sheet: 'Narrative' })
		: null;

	return /** @type {import('$lib/types').Workbook_Data} */ (data);
}
