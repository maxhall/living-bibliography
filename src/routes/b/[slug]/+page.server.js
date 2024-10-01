import { read } from '$app/server';
// @ts-expect-error TODO: Add ambient type to fix
import demo from '$lib/content/Living bibliography demo content-v0.5.xlsx';
// @ts-expect-error TODO: Add ambient type to fix
import cc from '$lib/content/2024-10-01 Campus Collaboration Living Bibliography.xlsx';
import { process_XLSX } from '$lib/xlsx/process';
import { read_XLSX_server } from '$lib/xlsx/read_server';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	/** @type {import('$lib/types').Living_Bibliography[]} */
	const content = [];
	const a = await load_sheet(demo);

	if (a.ok) content.push(a.data);

	const b = await load_sheet(cc);

	if (b.ok) content.push(b.data);

	const data = content.find((bib) => bib.info.Slug === params.slug);

	if (data) {
		return {
			bib_data: data
		};
	}

	error(404);
}

/** @param {any} sheet */
async function load_sheet(sheet) {
	const array_buffer = await read(sheet).arrayBuffer();
	const workbook_data = await read_XLSX_server(Buffer.from(array_buffer));
	const read_result = await process_XLSX(workbook_data);

	return read_result;
}
