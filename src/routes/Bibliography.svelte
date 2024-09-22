<script>
	import SourceCards from './SourceCards.svelte';
	import Graph from './Graph.svelte';
	import { bib_state } from './state.svelte';
	import BibMap from './BibMap.svelte';
	import { Info } from 'lucide-svelte';

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
		<div class="title">
			<h2 id="#bibliography">Bibliography</h2>
			<p class="tight info-text">
				<Info size={18} /><span>Interact with the source graph or select a tag to explore.</span>
			</p>
		</div>
		<div class="controls">
			<div class="first-column">
				<Graph />
				<p class="meta-text">
					{#if bib_state.highlighted_source}
						<span class="dot dot-source">
							{bib_state.highlighted_source}
						</span>
					{:else}
						<span class="dot dot-source">
							{#if bib_state.selected_tag}{selected_entries.length}/{/if}{entries.length} sources
						</span>
						<span class="dot dot-tag">
							{tags.length} tags
						</span>
						{#if bib_state.selected_tag}
							<button class="link-button" onclick={() => (bib_state.selected_tag = null)}
								>View all</button
							>
						{/if}
					{/if}
				</p>
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
				</ul>
			</div>
			<div class="map-wrapper">
				<BibMap entries={selected_entries} />
			</div>
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

	.title {
		border-bottom: 4px solid var(--ochre);
		display: flex;
		align-items: end;
		gap: 0.5rem;
		padding-bottom: 0.25rem;
	}

	h2 {
		color: var(--ochre);
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
	}

	.info-text {
		display: inline-flex;
		align-items: center;
		margin: 0;
	}

	.info-text span {
		margin-left: 0.2rem;
	}

	.controls {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 1rem;
		align-items: end;
		margin-bottom: 1rem;
		border-bottom: 4px solid var(--ochre);
	}

	.first-column {
		padding: 1rem 0 0.5rem 0;
	}

	.meta-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0.25rem 0;
	}

	.dot {
		margin-right: 0.25rem;
	}

	.dot::before {
		content: '';
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 0.15rem;
		border-radius: 50%;
		background-color: currentColor;
	}

	.dot-source {
		color: var(--ochre);
	}

	.dot-tag {
		color: var(--heritage-rose);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.15rem;
	}

	.tag button {
		font-size: 0.5rem;
		line-height: 1;
		padding: 0.2rem 0.35rem;
		border: 1px solid var(--charcoal);
		border-radius: 1rem;
		user-select: none;
	}

	.tag.selected button {
		background-color: var(--ochre);
		border-color: var(--ochre);
		color: var(--white);
	}

	.tag.highlighted button {
		background-color: var(--sandstone);
		border-color: var(--ochre);
		color: var(--ochre);
	}

	.map-wrapper {
		background-color: var(--light-grey);
		height: 100%;
		display: grid;
		align-items: center;
	}

	@media (max-width: 800px) {
		.controls {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.title {
			display: block;
		}
	}
</style>
