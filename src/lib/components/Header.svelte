<script>
	/** @type {{bib: import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();

	let scrollY = $state();

	// style="transform: translateX({-20 * Math.min(scrollY / 100, 1)}px)"
</script>

<svelte:window bind:scrollY />
<header>
	<div class="inner" class:scrolled={scrollY > 100}>
		<div class="title-wrapper">
			<h1>{bib.info.Title}</h1>
		</div>
		<p class="subtitle">
			{bib.info.Subtitle}
		</p>
		<p class="tight">{bib.info.Authorship} • Updated [FIX LAST UPDATED]</p>
	</div>
</header>

<style>
	header {
		background-color: var(--white);
	}

	.inner {
		align-self: start;
		position: sticky;
		top: 1rem;
		grid-column: 1 / 3;
		margin: 0 auto;
		max-width: 40rem;
		padding-top: 1rem;
		border-bottom: 4px solid var(--ochre);
	}

	h1 {
		position: relative;
		transition: font-size 200ms linear;
	}

	.scrolled h1 {
		font-size: 1rem;
	}

	.subtitle {
		font-size: 0.9rem;
		font-weight: 350;
		margin-bottom: 3rem;
	}

	@media (max-width: 80rem) {
		.inner {
			padding: 1rem;
		}
	}
</style>
