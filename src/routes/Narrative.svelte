<script>
	/** @type {{bib :import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();
</script>

{#if bib.narrative.length > 0}
	{#each bib.narrative as narrative_section}
		<h2>{narrative_section.Heading}</h2>
		<p>{narrative_section.Content}</p>
		{#if narrative_section['Related source titles'].length > 0}
			<ul>
				{#each narrative_section['Related source titles'] as source_title}
					{@const entry = bib.entries.find((e) => e.Title === source_title)}
					<li>{entry.Title}</li>
				{/each}
			</ul>
		{/if}
	{/each}
{/if}

<style>
</style>
