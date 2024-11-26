<script>
	/** @type {{data: import('./$types').LayoutServerData}} */
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.bib_data.info.Title} - Living bibliograpy</title>
	<meta
		name="description"
		content={`${data.bib_data.info.Subtitle}: ${data.bib_data.info.Subtitle} - A living bibliography by ${data.bib_data.info.Authorship}`}
	/>
</svelte:head>

<slot />
