<script>
	import { Plus } from 'lucide-svelte';
	import { bib_state } from './state.svelte';
	import SourceCard from './SourceCard.svelte';

	/** @type {{section: import('$lib/types').Narrative_Section} */
	let { section } = $props();

	/** @type {string | null} */
	let selected_source = $state(null);

	// TODO: This is ridiculous
	const map_section = section['Related source titles']
		.map((source_title) => bib_state.bib.entries.find((e) => e.Title === source_title))
		.find((e) => e?.Latitude);
</script>

<div class="outer" class:map_section>
	<div class="inner">
		{#if section.Heading}<h2>{section.Heading}</h2>{/if}
		<div class="narrative-content">
			{@html section['Markdown content']}
		</div>
		{#if section['Related source titles'].length > 0}
			<ul class="sources">
				{#each section['Related source titles'] as source_title}
					{@const entry = bib_state.bib.entries.find((e) => e.Title === source_title)}
					{@const selected = selected_source === entry.Title}
					<li class="source-chip" class:selected>
						<button onclick={() => (selected_source = selected ? null : entry.Title)}>
							<p>{entry?.Title}</p>
							<Plus />
						</button>
					</li>
					{#if selected}
						<div class="source-insert">
							<SourceCard {entry} />
						</div>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.outer {
		background-color: var(--white);
		padding: 3rem 0 0 0;
		display: grid;
		grid-template-columns: 3fr minmax(auto, 45ch) 1fr;
		min-height: 100vh;
	}

	.outer.map_section {
		background-color: transparent;
		padding: 10rem 0;
	}

	.inner {
		background-color: var(--white);
		padding: 1rem;
		grid-column: 2 / 3;
	}

	:global(.narrative-content li) {
		list-style: circle;
	}

	li {
		padding: 0.25rem;
		background-color: var(--light-grey);
	}

	button {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	.sources {
		margin-top: 1rem;
		display: grid;
		grid-auto-flow: dense;
		grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
		grid-gap: 0.5rem;
	}

	.source-insert {
		grid-column: 1 / -1;
	}

	.selected,
	.source-chip:hover {
		background-color: var(--sandstone);
	}

	.selected p {
		color: var(--ochre);
	}

	:global(.source-chip svg) {
		transition: transform 60ms linear;
	}

	:global(.source-chip:hover svg),
	:global(.source-chip.selected svg) {
		color: var(--ochre);
	}

	:global(.source-chip.selected svg) {
		transform: rotate(45deg);
	}
</style>
