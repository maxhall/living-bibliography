<script>
	import { Plus } from 'lucide-svelte';
	import SourceCard from './SourceCard.svelte';
	import { bib_state } from './state.svelte';

	/** @type {{source_titles: string[]}} */
	let { source_titles } = $props();
	/** @type {string | null} */
	let selected_source = $state(null);
</script>

{#if source_titles.length > 0}
	<ul class="sources">
		{#each source_titles as source_title}
			{@const entry = bib_state.bib.entries.find((e) => e.Title === source_title)}
			{@const selected = selected_source === entry.Title}
			<li class="source-chip" class:selected>
				<button onclick={() => (selected_source = selected ? null : entry.Title)}>
					<p class="tight">{entry?.Title}</p>
					<Plus />
				</button>
			</li>
			{#if selected}
				<div class="source-insert">
					<SourceCard {entry} featured={true} />
				</div>
			{/if}
		{/each}
	</ul>
{/if}

<style>
	li {
		padding: 0.25rem;
		background-color: var(--light-grey);
	}

	button {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
		user-select: none;
	}

	.sources {
		margin-top: 1rem;
		display: grid;
		grid-auto-flow: dense;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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
