<script>
	import NarrativeSourceGrid from './NarrativeSourceGrid.svelte';
	import { bib_state } from '$lib/state.svelte';

	/** @type {{section: import('$lib/types').Narrative_Section} */
	let { section } = $props();

	// TODO: This is ridiculous
	const map_section = section['Related source titles']
		.map((source_title) => bib_state.bib.entries.find((e) => e?.Title === source_title))
		.find((e) => e?.Latitude);
</script>

<div class="outer" class:map_section>
	<div class="inner">
		{#if section.Heading}<h2>{section.Heading}</h2>{/if}
		<div class="text-content">
			{@html section['Markdown content']}
		</div>
		<NarrativeSourceGrid source_titles={section['Related source titles']} />
	</div>
</div>

<style>
	.outer {
		background-color: var(--white);
		padding: 3rem 0;
		display: grid;
		grid-template-columns: 3fr minmax(auto, 45ch) 1fr;
		/* TODO: Restore and fix */
		/* min-height: calc(var(--narrative-map-max-height) + 4rem); */
	}

	.outer.map_section {
		background-color: transparent;
		padding: 10rem 0;
	}

	.inner {
		background-color: var(--white);
		padding: 1rem;
		grid-column: 2 / 3;
		align-self: start;
	}
</style>
