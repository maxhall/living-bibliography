<script>
	import { flip } from 'svelte/animate';
	import SourceCard from '$lib/components/SourceCard.svelte';

	/** @type {{entries: import('$lib/types').Entry[]}}*/
	let { entries } = $props();
</script>

<div class="cards">
	{#each entries as entry (entry.Title)}
		<div class="card-wrapper" animate:flip={{ duration: 150 }}>
			<SourceCard {entry} />
		</div>
	{/each}
</div>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 0.5rem;
	}
</style>
