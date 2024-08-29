<script>
	import Bibliography from './Bibliography.svelte';
	import Contact from './Contact.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Map from './Map.svelte';
	import Narrative from './Narrative.svelte';
	import SetSource from './SetSource.svelte';

	/** @type {import('$lib/types').Living_Bibliography | undefined} */
	let bib = $state();
</script>

<div class="wrapper">
	<main>
		{#if bib}
			<div class="prose-wrapper">
				<Header {bib} />
				<Map />
				<div class="narrative-wrapper">
					<Narrative {bib} />
				</div>
			</div>
			<Bibliography entries={bib.entries} />
			<Contact />
			<Footer />
		{:else}
			<SetSource on_success={(new_bib) => (bib = new_bib)} />
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

	.narrative-wrapper {
		grid-column: 2 / 3;
	}
</style>
