<script>
	import { required_entry_keys } from '$lib/constants';
	import FileInput from '$lib/File_Input.svelte';

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
							{@const entry = (bib.entries.find((e) => e.Title === source_title))}
							<li>{entry.Title}</li>
						{/each}
					</ul>
				{/if}
			{/each}
		</section>
	{/if}
	<section>
		<p>
			{#each required_entry_keys as key}
				{key}
			{/each}
		</p>
		{#each bib.entries as entry}
			<p>
				{#each required_entry_keys as key}
					{entry[key]}
				{/each}
			</p>
		{/each}
	</section>
{/if}

<footer>
	<p>This is a living bibliography. You can learn more and make your own.</p>
</footer>
