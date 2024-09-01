<script>
	import { ExternalLink } from 'lucide-svelte';

	/** @type {{entry: import('$lib/types').Entry}} */
	let { entry } = $props();
</script>

{#snippet field(/** @type {string} */ label, /** @type {string | null} */ content)}
	<p class="field-label">{label}</p>
	<p class="tags">{content}</p>
{/snippet}

<article class="card">
	<div class="primary">
		<h3>{entry.Title}</h3>
		<p>
			{entry.Publisher} • {entry.Date}
			{#if entry.Link}• <a href={entry.Link} target="_blank">Link <ExternalLink size={18} /></a
				>{/if}
		</p>
		<p class="tight">{entry.Annotation}</p>
	</div>
	<div class="meta">
		{@render field('Tags', entry.Tags.join(', '))}
		{#each ['Academic source'] as key}
			{@render field(key, entry[key])}
		{/each}
	</div>
</article>

<style>
	.card {
		height: 100%;
		background-color: var(--light-grey);
		padding: 0.5rem;
		border-radius: 0.2rem;
		display: grid;
		grid-template-rows: 1fr auto;
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
	h3 {
		color: var(--ochre);
		font-weight: 500;
		font-size: 0.75rem;
		margin: 0 0 0.5rem 0;
	}
</style>
