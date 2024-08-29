<script>
	import { required_entry_keys } from '$lib/read_XLSX';
	import { flip } from 'svelte/animate';
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
		<div class="cards">
			{#each selected_entries as entry (entry.Title)}
				<article class="card" animate:flip={{ duration: 150 }}>
					<h3>{entry.Title}</h3>
					<p>{entry.Annotation}</p>
					{#each required_entry_keys as key}
						<p>
							{entry[key]}
						</p>
					{/each}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		background-color: var(--sandstone);
		padding: 1rem;
	}

	.inner {
		max-width: 40rem;
		margin: 0 auto;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		grid-gap: 1rem;
	}

	.card {
		background-color: var(--white);
		padding: 0.5rem;
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
