<script>
	import LivingBibliography from './LivingBibliography.svelte';
	import SetSource from './SetSource.svelte';
	import { bib_state, set_bib } from './state.svelte';
</script>

{#if bib_state.bib}
	<LivingBibliography />
{:else}
	<SetSource on_success={(new_bib) => set_bib(new_bib)} />
{/if}
