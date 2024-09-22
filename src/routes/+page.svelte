<script>
	import Bibliography from './Bibliography.svelte';
	import Contact from './Contact.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Map from './Map.svelte';
	import Narrative from './Narrative.svelte';
	import SetSource from './SetSource.svelte';
	import { bib_state, set_bib } from './state.svelte';
</script>

<div class="wrapper">
	<main>
		{#if bib_state.bib}
			<Map />
			<div class="narrative-wrapper">
				<Header bib={bib_state.bib} />
				<Narrative bib={bib_state.bib} />
			</div>
			<Bibliography entries={bib_state.bib.entries} />
			<Contact />
			<Footer />
		{:else}
			<SetSource on_success={(new_bib) => set_bib(new_bib)} />
		{/if}
	</main>
</div>

<style>
	.wrapper {
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	main {
		position: relative;
	}

	.narrative-wrapper {
		max-width: var(--narrative-width);
		margin: 0 auto;
	}
</style>
