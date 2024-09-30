<script>
	import LivingBibliography from '$lib/components/LivingBibliography.svelte';
	import SetSource from '$lib/components/SetSource.svelte';
	import { bib_state, set_bib } from '$lib/state.svelte';
</script>

{#if bib_state.bib}
	<LivingBibliography />
{:else}
	<SetSource on_success={(new_bib) => set_bib(new_bib)} />
{/if}
