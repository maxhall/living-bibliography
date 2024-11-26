export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	const { bib_data } = await parent();

	return {
		bib_data
	};
}
