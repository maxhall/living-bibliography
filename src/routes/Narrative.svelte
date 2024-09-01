<script>
	import NarrativeSection from './NarrativeSection.svelte';

	/** @type {{bib :import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();
</script>

{#if bib.narrative.length > 0}
	{#each bib.narrative as section}
		<NarrativeSection {section} />
	{/each}
{/if}
