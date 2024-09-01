<script>
	import SourceCards from './SourceCards.svelte';
	import Graph from './Graph.svelte';
	/** @type {{entries: import('$lib/types').Entry[]}} */
	let { entries } = $props();

	/** @param {string[]} arr */
	const dedupe_string_array = (arr) => Array.from(new Set([...arr]));
	/** @param {string[]} arr */
	const alphabetically = (arr) => arr.toSorted((a, b) => a.localeCompare(b));

	let tags = $derived(alphabetically(dedupe_string_array(entries.flatMap((e) => e.Tags))));

	/** @type {string | null} */
	let selected_tag = $state(null);
	let selected_entries = $derived(
		entries.filter((e) => (selected_tag ? e.Tags.includes(selected_tag) : true))
	);
</script>

<section>
	<div class="inner">
		<div class="bib-header">
			<h2 id="#bibliography">Bibliography</h2>
			<div>
				<p>{entries.length} sources</p>
				<ul class="tags">
					{#each tags as tag}
						<li class="tag" class:selected={selected_tag === tag}>
							<button onclick={() => (selected_tag = selected_tag === tag ? null : tag)}
								>{tag}</button
							>
						</li>
					{/each}
					{#if selected_tag}
						<li class="tag"><button onclick={() => (selected_tag = null)}>View all</button></li>
					{/if}
				</ul>
			</div>
		</div>
		<Graph />
		<SourceCards entries={selected_entries} />
	</div>
</section>

<style>
	section {
		padding: 1rem;
	}

	.inner {
		max-width: 40rem;
		margin: 0 auto;
	}

	.bib-header {
		background-color: var(--sandstone);
		max-width: 50%;
		padding: 1rem;
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
		font-size: 16px;
		padding: 0.25rem;
		background-color: var(--white);
		border-radius: 0.25rem;
	}

	.tag.selected button {
		background-color: var(--ochre);
	}
</style>
