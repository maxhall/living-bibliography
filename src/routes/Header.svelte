<script>
	/** @type {{bib: import('$lib/types').Living_Bibliography}} */
	let { bib } = $props();

	let scrollY = $state();

	// const last_updated = $derived(
	// 	bib.entries.toSorted((a, b) => a['Date updated'] < b['Date updated'])
	// );

	// console.log(last_updated);
</script>

<svelte:window bind:scrollY />
<header>
	<div class="inner" class:scrolled={scrollY > 100}>
		<div class="title-wrapper">
			<h1>{bib.info.Title}</h1>
		</div>
		<p style="transform: translateX({-20 * Math.min(scrollY / 100, 1)}px)">
			{bib.info.Subtitle}
		</p>
		<p>{bib.info.Authorship}</p>
	</div>
</header>

<style>
	header {
		background-color: var(--sandstone);
		width: 100%;
		height: 15rem;
	}

	.inner {
		align-self: start;
		position: sticky;
		top: 1rem;
		grid-column: 1 / 3;
		margin: 2rem 0 1rem;
	}

	h1 {
		position: relative;
		transition: font-size 200ms linear;
	}

	.scrolled h1 {
		font-size: 1rem;
	}
</style>
