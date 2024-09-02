<script>
	import { graph_data_from_bib_state } from '$lib/utils';
	import { forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';
	import { bib_state } from './state.svelte';
	import { onMount } from 'svelte';

	let computed_nodes = $state([]);
	let computed_links = $state([]);
	/** @type {string | null} */
	let highlighted_node = $state(null);

	onMount(() => {
		if (!bib_state.bib) return;

		const { nodes, links } = compute_positions(bib_state.bib);

		computed_nodes = nodes;
		computed_links = links;
	});

	/** @param {import("$lib/types").Living_Bibliography} bib*/
	function compute_positions(bib) {
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
</script>

<figure>
	<svg viewBox="-50 -50 100 100">
		{#if computed_links}
			{#each computed_links as l}
				<line x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y} />
			{/each}
		{/if}
		{#if computed_nodes}
			{#each computed_nodes as n}
				<g class="activity c-{n.type}" transform="translate({n.x}, {n.y})">
					<circle
						onpointerenter={() => (highlighted_node = n.title)}
						onpointerleave={() => (highlighted_node = null)}
						r={n.radius}><title>{n.title}</title></circle
					>
				</g>
			{/each}
		{/if}
	</svg>
	{#if highlighted_node}<p>{highlighted_node}</p>{/if}
</figure>

<style>
	line {
		stroke: var(--sandstone);
		stroke-width: 0.3;
	}

	figure {
		max-width: 25rem;
	}

	.c-source {
		fill: var(--ochre);
	}

	.c-tag {
		fill: var(--heritage-rose);
	}
</style>
