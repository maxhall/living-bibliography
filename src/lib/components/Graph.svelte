<script>
	import { compute_positions } from '$lib/graph';
	import { bib_state } from '$lib/state.svelte';
	import { onMount } from 'svelte';

	let computed_nodes = $state([]);
	let computed_links = $state([]);
	let viewBox_elements = $derived.by(() => {
		const nx = /** @type {number[]} */ (computed_nodes.map((n) => n.x));
		const ny = /** @type {number[]} */ (computed_nodes.map((n) => n.y));
		const min_x = Math.min(...nx);
		const max_x = Math.max(...nx);
		const min_y = Math.min(...ny);
		const max_y = Math.max(...ny);
		const padding = 4;
		// Keep it square by using the largest side
		const length = Math.max(max_x - min_x + padding * 2, max_y - min_y + padding * 2);

		return {
			x: min_x - padding,
			y: min_y - padding,
			length
		};
	});
	let viewBox = $derived(
		`${viewBox_elements.x} ${viewBox_elements.y} ${viewBox_elements.length} ${viewBox_elements.length}`
	);
	let scale_factor = $derived(viewBox_elements.length / 100);

	onMount(() => {
		if (!bib_state.bib) return;

		const { nodes, links } = compute_positions(bib_state.bib);

		computed_nodes = nodes;
		computed_links = links;
	});

	/**
	 * @param {string} title
	 * @param {'source' | 'tag'} type
	 **/
	function get_fill(title, type) {
		if (!bib_state.selected_tag && type === 'tag') return `var(--heritage-rose)`;
		if (!bib_state.selected_tag && type === 'source') return `var(--ochre)`;
		if (bib_state.selected_tag && type == 'tag' && title === bib_state.selected_tag)
			return `var(--heritage-rose)`;

		if (type === 'source') {
			const has_selected_tag = bib_state.bib?.entries
				.find((e) => e.Title === title)
				?.Tags.includes(bib_state.selected_tag);

			if (has_selected_tag) return `var(--ochre)`;
		}

		return `var(--light-grey)`;
	}
</script>

<figure style="max-width: {scale_factor * 12}rem">
	<svg {viewBox}>
		{#if computed_links}
			{#each computed_links as l}
				<line
					x1={l.source.x}
					y1={l.source.y}
					x2={l.target.x}
					y2={l.target.y}
					class:selected={bib_state.selected_tag === l.target.title}
					class:highlighted={bib_state.highlighted_tag === l.target.title}
					class:nah={bib_state.selected_tag && bib_state.selected_tag !== l.target.title}
				/>
			{/each}
		{/if}
		{#if computed_nodes}
			{#each computed_nodes as n}
				<g class="c-{n.type}" transform="translate({n.x}, {n.y})">
					<circle
						style="fill: {get_fill(n.title, n.type)}"
						onpointerenter={() => {
							if (n.type === 'tag') bib_state.highlighted_tag = n.title;
							if (n.type === 'source') bib_state.highlighted_source = n.title;
						}}
						onpointerleave={() => {
							bib_state.highlighted_tag = null;
							bib_state.highlighted_source = null;
						}}
						onpointerup={() => {
							if (n.type === 'tag') {
								bib_state.selected_tag = bib_state.selected_tag === n.title ? null : n.title;
							} else {
								bib_state.selected_tag = null;
							}
						}}
						r={n.radius}><title>{n.title}</title></circle
					>
				</g>
			{/each}
		{/if}
	</svg>
</figure>

<style>
	figure {
		background-color: var(--white);
		border-radius: 0.5rem;
		position: relative;
		margin: 0 auto 1rem;
	}

	svg {
		display: block;
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
		stroke-width: 0.5;
	}

	line.nah {
		stroke: var(--light-grey);
	}

	line.selected {
		stroke: var(--heritage-rose);
	}

	.c-tag circle:hover {
		stroke-width: 1;
		stroke: var(--heritage-rose);
	}

	.c-source circle:hover {
		stroke-width: 1;
		stroke: var(--ochre);
	}
</style>
