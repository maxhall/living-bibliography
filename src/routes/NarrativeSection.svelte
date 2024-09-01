<script>
	import { Plus } from 'lucide-svelte';
	import { bib_state } from './state.svelte';
	import SourceCard from './SourceCard.svelte';

	/** @type {{section: import('$lib/types').Narrative_Section} */
	let { section } = $props();

	/** @type {string | null} */
	let selected_source = $state(null);
</script>

<div class="hmm">
	<h2>{section.Heading}</h2>
	{@html section['Markdown content']}
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

<style>
	.hmm {
		max-width: 20rem;
		background-color: var(--white);
		padding: 1rem;
		margin: 0 auto 10rem auto;
	}

	li {
		color: var(--charcoal);
		padding: 0.25rem;
		font-size: 0.6rem;
		line-height: 1.2;
	}

	.sources {
		display: grid;
		grid-auto-flow: dense;
		grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
		grid-gap: 0.5rem;
	}

	.source-insert {
		grid-column: 1 / -1;
	}
	.source-chip {
		background-color: var(--light-grey);
		display: grid;
		grid-template-rows: 1fr auto;
		height: 100%;
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
