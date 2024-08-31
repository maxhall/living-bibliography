<script>
	import { required_entry_keys } from '$lib/read_XLSX';
	import { flip } from 'svelte/animate';
	import SourceCard from './SourceCards.svelte';
	import SourceCards from './SourceCards.svelte';
	/** @type {{entries: import('$lib/types').Entry[]}} */
	let { entries } = $props();

	let tags = $derived(entries.flatMap((e) => e.Tags));

	/** @type {string | null} */
	let selected_tag = $state(null);

	let selected_entries = $derived(
		entries.filter((e) => (selected_tag ? e.Tags.includes(selected_tag) : true))
	);
</script>

<section>
	<div class="inner">
		<h2>Bibliography</h2>
		<div>
			<p>Filter by tag</p>
			<ul class="tags">
				{#each tags as tag}
					<li class="tag" class:selected={selected_tag === tag}>
						<button onclick={() => (selected_tag = selected_tag === tag ? null : tag)}>{tag}</button
						>
					</li>
				{/each}
				{#if selected_tag}
					<li class="tag"><button onclick={() => (selected_tag = null)}>View all</button></li>
				{/if}
			</ul>
		</div>
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

	.tags {
		display: flex;
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
