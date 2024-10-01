<script>
	let { children } = $props();
</script>

<div class="wrapper">
	<section>
		{@render children()}
	</section>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
	}

	section {
		width: 20rem;
		background-color: var(--sandstone);
		border-left: 4px solid var(--ochre);
		padding: 1rem;
		margin: 2rem auto;
	}
</style>
