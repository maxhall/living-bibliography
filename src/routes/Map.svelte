<script>
	import { onMount } from 'svelte';
	import { bib_state } from './state.svelte';
	import 'leaflet/dist/leaflet.css';

	/** @type {undefined | HTMLDivElement} */
	let map_el;
	/** @type {undefined | import('leaflet').Map}*/
	let map;
	/** @type {typeof import('leaflet')}*/
	let L;

	onMount(async () => {
		L = (await import('leaflet')).default;

		// @ts-expect-error
		map = L.map(map_el, { scrollWheelZoom: false }).setView([-30, 135], 4);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
			attribution: '©OpenStreetMap, ©CartoDB'
		}).addTo(map);
	});

	$effect(() => {
		bib_state.visible_markers;
		if (!map) return;

		/** @type {import('leaflet').Marker[]}*/
		const visible_markers = bib_state.visible_markers
			.filter((s) => typeof s.Latitude == 'number' && typeof s.Longitude == 'number')
			// @ts-expect-error
			.map((s) => L.marker([s.Latitude, s.Longitude]));

		const group = L.featureGroup(visible_markers).addTo(map);

		map.fitBounds(group.getBounds().pad(0.5));
	});
</script>

<svelte:window on:resize={() => map?.invalidateSize()} />
<div bind:this={map_el}></div>

<style>
	div {
		position: sticky;
		top: 0;
		height: 100vh;
		max-height: 50rem;
	}
</style>
