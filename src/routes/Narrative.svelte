<script>
	import NarrativeSection from './NarrativeSection.svelte';
	import Scrolly from '$lib/Scrolly.svelte';
	import { set_visible_markers } from './state.svelte';

	/** @type {{bib: import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();

	let scroll_value = $state();

	$effect(() => {
		if (!scroll_value) return;

		const source_titles = bib.narrative[scroll_value]['Related source titles'];
		const entries = /** @type {import("$lib/types").Entry[]} */ (
			source_titles.map((t) => bib.entries.find((e) => e.Title === t))
		);

		set_visible_markers(entries);
	});
</script>

{#if bib.narrative.length > 0}
	<Scrolly bind:value={scroll_value} bottom={-250}>
		{#each bib.narrative as section}
			<NarrativeSection {section} />
		{/each}
	</Scrolly>
{/if}
