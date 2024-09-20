<script>
	/** @type {{bib: import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();

	let scrollY = $state();

	// TODO: Handle if there are no bib entries
	const last_updated = /** @type {Date} */ (
		bib.entries.toSorted(
			(a, b) =>
				/** @type {Date} */ (a['Date added to bibliography']).valueOf() <
				/** @type {Date} */ (b['Date added to bibliography']).valueOf()
		)[0]['Date added to bibliography']
	);

	// style="transform: translateX({-20 * Math.min(scrollY / 100, 1)}px)"
</script>

<svelte:window bind:scrollY />
<header>
	<div class="inner" class:scrolled={scrollY > 100}>
		<div class="title-wrapper">
			<h1>{bib.info.Title}</h1>
		</div>
		<p>
			{bib.info.Subtitle}
		</p>
		<p>{bib.info.Authorship} • Updated {last_updated.toLocaleDateString()}</p>
		<!-- <p><a href="#bibliography">Go to sources</a></p> -->
	</div>
</header>

<style>
	header {
		display: block;
		background-color: var(--sandstone);
		width: 100%;
		height: 15rem;
	}

	.inner {
		align-self: start;
		position: sticky;
		top: 1rem;
		grid-column: 1 / 3;
		margin: 0 auto 1rem;
		max-width: 40rem;
		padding-top: 1rem;
	}

	h1 {
		position: relative;
		transition: font-size 200ms linear;
	}

	.scrolled h1 {
		font-size: 1rem;
	}
</style>
