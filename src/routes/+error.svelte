<script>
	import { page } from '$app/stores';
	import CentredPanel from '$lib/components/CentredPanel.svelte';
</script>

<CentredPanel>
	<h1>{$page.status}</h1>
	<p>{$page.error.message}</p>
	<p><a href="/">Go home</a></p>
</CentredPanel>
