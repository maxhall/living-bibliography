<script>
	import Bibliography from './Bibliography.svelte';
	import FileInput from './File_Input.svelte';

	/** @type {import('$lib/types').Living_Bibliography | undefined} */
	let bib = $state();
</script>

<FileInput
	on_success={(new_bib) => {
		bib = new_bib;
	}}
/>

{#if bib}
	<header>
		<h1>{bib.info.Title}</h1>
		<p>{bib.info.Subtitle}</p>
		<p>{bib.info.Authorship}</p>
	</header>
	{#if bib.narrative.length > 0}
		<section>
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
		</section>
	{/if}
	<Bibliography entries={bib.entries} />
{/if}

<footer>
	<p>This is a living bibliography. You can learn more and make your own.</p>
</footer>
