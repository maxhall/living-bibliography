import { parse } from 'marked';
import DOMPurify from 'dompurify';

// TODO: Return errors to warn of bad content
// TODO: Add allowlist
/** @param {string} unsafe_content */
export function parse_content_to_markdown(unsafe_content) {
	return DOMPurify.sanitize(/** @type {string} */ (parse(unsafe_content)), {
		USE_PROFILES: { html: true }
	});
}

/** @param {import('./types').Living_Bibliography} bib */
export function graph_data_from_bib_state(bib) {
	/** @param {string} tag_title */
	const get_tag_id = (tag_title) => {
		const already_exists = nodes.find((n) => n.type == 'tag' && n.title == tag_title);

		if (already_exists) return already_exists.id;

		const id = last_id++;
		nodes.push({
			id,
			type: 'tag',
			radius: 1,
			title: tag_title
		});

		return id;
	};
	/** @param {[number, number]} ids */
	const add_link = ([a, b]) => {
		const already_exists = links.find((l) => l.includes(a) && l.includes(b));

		if (already_exists) return;

		links.push([a, b]);
	};

	/** @type {{id: number, type: 'source' | 'tag', radius: number, title: string }[]} */
	const nodes = [];
	/** @type {[number, number][]}*/
	const links = [];

	let last_id = 0;

	bib.entries.forEach((e) => {
		const source_id = last_id++;

		nodes.push({
			id: source_id,
			radius: 2,
			type: 'source',
			title: /** @type {string} */ (e.Title)
		});

		e.Tags.forEach((t) => {
			const tag_id = get_tag_id(t);

			add_link([source_id, tag_id]);
		});
	});

	return {
		nodes,
		links: links.map((l) => {
			return {
				source: l[0],
				target: l[1],
				value: 1
			};
		})
	};
}
