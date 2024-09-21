<script>
	import { compute_positions } from '$lib/graph';
	import { bib_state } from './state.svelte';
	import { onMount } from 'svelte';

	let computed_nodes = $state([]);
	let computed_links = $state([]);

	onMount(() => {
		if (!bib_state.bib) return;

		const { nodes, links } = compute_positions(bib_state.bib);

		console.log(links);
		computed_nodes = nodes;
		computed_links = links;
	});
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
						class:selected={n.type === 'tag' && bib_state.selected_tag === n.title}
						class:highlighted={bib_state.highlighted_tag === n.title}
						onpointerenter={() => {
							if (n.type === 'tag') bib_state.highlighted_tag = n.title;
						}}
						onpointerleave={() => {
							bib_state.highlighted_tag = null;
						}}
						onpointerup={() => {
							if (n.type === 'tag') {
								bib_state.selected_tag = bib_state.selected_tag === n.title ? null : n.title;
							}
						}}
						r={n.radius}><title>{n.title}</title></circle
					>
				</g>
			{/each}
		{/if}
	</svg>
	<!-- {#if highlighted_node}<p class="graph-label">{highlighted_node}</p>{/if} -->
</figure>

<style>
	figure {
		max-width: 25rem;
		background-color: var(--white);
		border-radius: 0.5rem;
		max-width: 12rem;
		position: relative;
	}

	.graph-label {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		font-weight: 500;
		color: var(--ochre);
		max-width: calc(100% - 2rem);
	}

	line {
		stroke: var(--heritage-rose);
		stroke-width: 0.3;
	}

	.c-source {
		fill: var(--ochre);
	}

	.c-tag {
		fill: var(--heritage-rose);
	}

	.c-source:hover,
	.c-source .highlighted {
		stroke-width: 1;
		stroke: var(--jacaranda);
	}

	.c-tag:hover,
	.c-tag .highlighted {
		stroke-width: 0.5;
		stroke: var(--heritage-rose);
		fill: var(--ochre);
	}
</style>
