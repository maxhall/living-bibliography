<script>
	import AboutContent from './AboutContent.svelte';
</script>

<footer>
	<div class="inner">
		<p>
			This is a <b>living bibliography</b>. You can
			<a href="/">learn more and make your own.</a>
		</p>
		<AboutContent />
	</div>
</footer>

<style>
	footer {
		background-color: var(--white);
		padding: 1rem;
	}

	.inner {
		max-width: 40rem;
		margin: 0 auto;
	}

	:global(footer .inner > p) {
		/* padding: 1rem 0; */
		max-width: 50ch;
	}
</style>
