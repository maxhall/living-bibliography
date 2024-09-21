<script>
	import SourceCards from './SourceCards.svelte';
	import Graph from './Graph.svelte';
	import { bib_state } from './state.svelte';
	import BibMap from './BibMap.svelte';

	/** @type {{entries: import('$lib/types').Entry[]}} */
	let { entries } = $props();

	/** @param {string[]} arr */
	const dedupe_string_array = (arr) => Array.from(new Set([...arr]));
	/** @param {string[]} arr */
	const alphabetically = (arr) => arr.toSorted((a, b) => a.localeCompare(b));

	let tags = $derived(alphabetically(dedupe_string_array(entries.flatMap((e) => e.Tags))));

	let selected_entries = $derived(
		entries
			.filter((e) => (bib_state.selected_tag ? e.Tags.includes(bib_state.selected_tag) : true))
			.toSorted((a, b) => a.Publisher.localeCompare(b.Publisher))
	);
</script>

<section>
	<div class="inner">
		<div class="bib-header">
			<div>
				<h2 id="#bibliography">Bibliography</h2>
				<p>{entries.length} sources</p>
				<ul class="tags">
					{#each tags as tag}
						<li
							class="tag"
							class:selected={bib_state.selected_tag === tag}
							class:highlighted={bib_state.highlighted_tag === tag}
						>
							<button
								onclick={() => {
									bib_state.selected_tag = bib_state.selected_tag === tag ? null : tag;
								}}
								onpointerenter={() => {
									bib_state.highlighted_tag = tag;
								}}
								onpointerleave={() => {
									bib_state.highlighted_tag = null;
								}}>{tag}</button
							>
						</li>
					{/each}
					{#if bib_state.selected_tag}
						<li class="tag">
							<button onclick={() => (bib_state.selected_tag = null)}>View all</button>
						</li>
					{/if}
				</ul>
			</div>
			<Graph />
			<BibMap entries={selected_entries} />
		</div>
		<SourceCards entries={selected_entries} />
	</div>
</section>

<style>
	section {
		padding: 1rem;
		background-color: var(--white);
	}

	.inner {
		max-width: 40rem;
		margin: 0 auto;
	}

	.bib-header {
		background-color: var(--sandstone);
		padding: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	h2 {
		color: var(--ochre);
		font-size: 1.5rem;
		font-weight: 700;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.tag button {
		font-size: 0.6rem;
		line-height: 1;
		padding: 0.25rem 0.4rem;
		border: 1px solid var(--charcoal);
		border-radius: 1rem;
	}

	.tag.selected button {
		background-color: var(--ochre);
	}

	.tag.highlighted button {
		background-color: aqua;
	}

	@media (max-width: 800px) {
		.bib-header {
			grid-template-columns: 1fr;
		}
	}
</style>
