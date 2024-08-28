<script>
	import Bibliography from './Bibliography.svelte';
	import Contact from './Contact.svelte';
	import FileInput from './File_Input.svelte';
	import Footer from './Footer.svelte';
	import Narrative from './Narrative.svelte';

	/** @type {import('$lib/types').Living_Bibliography | undefined} */
	let bib = $state();

	let scrollY = $state();
</script>

<svelte:window bind:scrollY />

<div class="wrapper">
	<main>
		{#if bib}
			<div class="prose-wrapper">
				<header class:scrolled={scrollY > 100}>
					<div class="title-wrapper">
						<h1>{bib.info.Title}</h1>
					</div>
					<p style="transform: translateX({-20 * Math.min(scrollY / 100, 1)}px)">
						{bib.info.Subtitle}
					</p>
					<p>{bib.info.Authorship}</p>
				</header>
				<div class="narrative-wrapper">
					<Narrative {bib} />
				</div>
			</div>
			<Bibliography entries={bib.entries} />
			<Contact />
			<Footer />
		{:else}
			<FileInput
				on_success={(new_bib) => {
					bib = new_bib;
				}}
			/>
		{/if}
	</main>
</div>

<style>
	.wrapper {
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	.prose-wrapper {
		display: grid;
		position: relative;
		grid-template-columns: 12rem 1fr;
		max-width: 40rem;
		margin: 0 auto;
	}

	header {
		align-self: start;
		position: sticky;
		top: 1rem;
		grid-column: 1 / 3;
		margin: 2rem 0 1rem;
	}

	header h1 {
		position: relative;
		transition: font-size 200ms linear;
	}

	header.scrolled h1 {
		font-size: 1rem;
	}

	.narrative-wrapper {
		grid-column: 2 / 3;
	}
</style>
