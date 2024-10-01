<script>
	import AboutContent from './AboutContent.svelte';
</script>

<footer>
	<div class="inner">
		<p>
			This page is a <b>living bibliography</b>. You can
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
		padding: 1rem 0;
		max-width: 45ch;
	}
</style>
