<script>
	import { ExternalLink } from 'lucide-svelte';
	import { bib_state } from './state.svelte';

	/** @type {{entry: import('$lib/types').Entry, featured: boolean}} */
	let { entry, featured } = $props();
</script>

{#snippet field(/** @type {string} */ label, /** @type {string | null} */ content)}
	<p class="field-label">{label}</p>
	<p class="tight">{content}</p>
{/snippet}

<article class="card" class:featured>
	<div class="inner">
		<div class="primary">
			<h3>{entry.Title}</h3>
			<p class="tight facts">
				{entry.Publisher} • {entry.Date}
				{#if entry.Link}• <a href={entry.Link} target="_blank">Link<ExternalLink size={14} /></a
					>{/if}
			</p>
		</div>
		<p class="tight">{entry.Annotation}</p>
		<div class="meta">
			{@render field('Tags', entry.Tags.join(', '))}
			{#each bib_state.bib?.author_defined_bibliography_keys ?? [] as key}
				{@render field(key, entry[key])}
			{/each}
		</div>
	</div>
</article>

<style>
	article {
		container-type: inline-size;
		height: 100%;
		background-color: var(--light-grey);
		padding: 0.5rem;
	}

	.featured {
		background-color: var(--sandstone);
		border-left: 4px solid var(--ochre);
	}

	.inner {
		height: 100%;
		display: grid;
		gap: 0.5rem;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}

	@container (min-width: 375px) {
		article .inner {
			grid-template-columns: 3fr 2fr;
		}

		article .primary {
			grid-column: 1 / -1;
		}

		article .meta {
			border-width: 0 0 0 1px;
			padding: 0 0 0 0.5rem;
			align-self: unset;
		}
	}

	.facts {
		margin-bottom: 1rem;
	}

	.meta {
		border: 1px solid var(--charcoal);
		border-width: 1px 0 0 0;
		color: var(--charcoal);
		padding-top: 0.5rem;
		align-self: end;
	}

	.field-label {
		text-transform: uppercase;
		font-size: 0.45rem;
		letter-spacing: 0.2px;
		font-weight: 550;
		margin: 0;
		line-height: 1.2;
	}

	h3 {
		color: var(--ochre);
		font-weight: 500;
		font-size: 0.8rem;
		margin: 0 0 0 0;
	}
</style>
