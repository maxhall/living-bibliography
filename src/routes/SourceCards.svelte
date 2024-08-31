<script>
	import { flip } from 'svelte/animate';

	/** @type {{entries: import('$lib/types').Entry[]}}*/
	let { entries } = $props();
</script>

<div class="cards">
	{#each entries as entry (entry.Title)}
		<article class="card" animate:flip={{ duration: 150 }}>
			<div class="primary">
				<h3>{entry.Title}</h3>
				<p>
					{entry.Publisher} • {entry.Date}
					{#if entry.Link}• <a href={entry.Link} target="_blank">Link</a>{/if}
				</p>
				<p class="annotation">{entry.Annotation}</p>
			</div>
			<div class="meta">
				<p class="field-label">Tags</p>
				<p class="tags">{entry.Tags.join(', ')}</p>
			</div>
		</article>
	{/each}
</div>

<style>
	h3 {
		color: var(--ochre);
		font-weight: 500;
		font-size: 0.75rem;
		margin: 0 0 0.5rem 0;
	}

	.card {
		background-color: var(--light-grey);
		padding: 0.5rem;
		border-radius: 0.2rem;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 0.5rem;
	}

	.annotation {
		font-size: 0.6rem;
		line-height: 0.9rem;
	}

	.meta {
		border-top: 1px solid var(--charcoal);
		color: var(--charcoal);
		padding-top: 0.5rem;
	}

	.field-label {
		text-transform: uppercase;
		font-size: 0.5rem;
		font-weight: 550;
		margin: 0;
		line-height: 1.2;
	}
</style>
