import { forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';
import { GRAPH_SOURCE_RADIUS, GRAPH_TAG_RADIUS } from './constants';

/** @param {import('./types').Living_Bibliography} bib */
function graph_data_from_bib_state(bib) {
	/** @param {string} tag_title */
	const get_tag_id = (tag_title) => {
		const already_exists = nodes.find((n) => n.type == 'tag' && n.title == tag_title);

		if (already_exists) return already_exists.id;

		const id = last_id++;
		nodes.push({
			id,
			type: 'tag',
			radius: GRAPH_TAG_RADIUS,
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
			radius: GRAPH_SOURCE_RADIUS,
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

/** @param {import("$lib/types").Living_Bibliography} bib */
export function compute_positions(bib) {
	const { nodes, links } = graph_data_from_bib_state(bib);
	const simulation = forceSimulation(nodes)
		.force(
			'link',
			forceLink(links)
				.id((d) => d.id)
				.distance(1)
				.strength(0.6)
		)
		.force('charge', forceManyBody())
		.force('x', forceX().strength(1))
		.force('y', forceY().strength(1))
		.stop();

	for (let i = 0; i < 300; i++) {
		simulation.tick();
	}

	return {
		nodes,
		links
	};
}
