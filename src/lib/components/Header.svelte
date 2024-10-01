<script>
	/** @type {{bib: import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();

	const datestring = /** @type {Date} */ (bib.info['Date updated']).toLocaleDateString();
</script>

<header>
	<div class="inner">
		<div class="title-wrapper">
			<h1>{bib.info.Title}</h1>
		</div>
		<p class="subtitle">
			{bib.info.Subtitle}
		</p>
		<p class="tight">{bib.info.Authorship} • Updated {datestring}</p>
	</div>
</header>

<style>
	header {
		background-color: var(--white);
	}

	.inner {
		top: 1rem;
		grid-column: 1 / 3;
		margin: 0 auto;
		max-width: 40rem;
		padding-top: 1rem;
		border-bottom: 4px solid var(--ochre);
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
