<script>
	import LivingBibliography from '$lib/components/LivingBibliography.svelte';
	import SetSource from '$lib/components/SetSource.svelte';
	import { bib_state, set_bib } from '$lib/state.svelte';
</script>

<svelte:head>
	<title>{bib_state.bib ? bib_state.bib.info.Title : 'View'} - Living bibliograpy</title>
	<meta
		name="description"
		content={bib_state.bib
			? `${bib_state.bib.info.Subtitle}: ${bib_state.bib.info.Subtitle} - A living bibliography by ${bib_state.bib.info.Authorship}`
			: 'View or create a living bibliography'}
	/>
</svelte:head>

{#if bib_state.bib}
	<LivingBibliography />
{:else}
	<SetSource on_success={(new_bib) => set_bib(new_bib)} />
{/if}
