<script>
	import LivingBibliography from '$lib/components/LivingBibliography.svelte';
	import { set_bib } from '$lib/state.svelte';

	/** @type {{data: import('./$types').PageServerData}} */
	let { data } = $props();

	set_bib(data.bib_data);
</script>

<LivingBibliography />
