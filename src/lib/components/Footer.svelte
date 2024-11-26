<script>
	import AboutContent from './AboutContent.svelte';
</script>

<footer>
	<div class="inner">
		<p>
			This is a living bibliography. You can
			<a href="/">learn more and make your own.</a>
		</p>
		<AboutContent />
		<p>
			<a class="rounded-link" href="#top">Return to top</a>
		</p>
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

	.embed {
		color: white;
	}
</style>
