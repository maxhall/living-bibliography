<script>
	import Bibliography from './Bibliography.svelte';
	import Contact from './Contact.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Map from './Map.svelte';
	import Narrative from './Narrative.svelte';
	import { bib_state } from './state.svelte';
</script>

<Map />
<div class="narrative-wrapper">
	<Header bib={bib_state.bib} />
	<Narrative bib={bib_state.bib} />
</div>
<Bibliography entries={bib_state.bib.entries} />
<Contact />
<Footer />

<style>
	.narrative-wrapper {
		max-width: var(--narrative-width);
		margin: 0 auto;
	}
</style>
