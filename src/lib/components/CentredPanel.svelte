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
		max-width: 20rem;
		background-color: var(--sandstone);
		border-style: solid;
		border-color: var(--ochre);
		border-width: 0px 0px 0px 4px;
		padding: 1rem;
		margin: 2rem auto;
	}

	@media (max-width: 540px) {
		.wrapper {
			background-color: var(--sandstone);
		}

		section {
			border-width: 4px 0px 0px;
			margin: 0;
		}
	}
</style>
