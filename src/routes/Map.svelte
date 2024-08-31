<script>
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	/** @type {undefined | HTMLDivElement} */
	let map_el;
	/** @type {undefined | import('leaflet').Map}*/
	let map;

	onMount(async () => {
		const L = (await import('leaflet')).default;
		// @ts-expect-error
		map = L.map(map_el).setView([-30, 135], 4);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
			attribution: '©OpenStreetMap, ©CartoDB'
		}).addTo(map);
	});
</script>

<svelte:window on:resize={() => map?.invalidateSize()} />
<div bind:this={map_el}></div>

<style>
	div {
		height: 100vh;
		max-height: 50rem;
	}
</style>
