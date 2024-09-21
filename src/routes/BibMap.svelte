<script>
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	/** @type {{entries: import('$lib/types').Entry[]}}*/
	let { entries } = $props();
	/** @type {undefined | HTMLDivElement} */
	let map_el;
	/** @type {undefined | import('leaflet').Map}*/
	let map;
	/** @type {typeof import('leaflet')}*/
	let L;
	/** @type {undefined | import('leaflet').FeatureGroup}*/
	let marker_group;

	onMount(async () => {
		L = (await import('leaflet')).default;

		// @ts-expect-error
		map = L.map(map_el, { scrollWheelZoom: false }).setView([-30, 135], 4);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
			attribution: '©OpenStreetMap, ©CartoDB'
		}).addTo(map);
	});

	$effect(() => {
		entries;

		if (!map) return;

		/** @type {import('leaflet').Marker[]}*/
		const visible_markers = entries
			.filter((e) => typeof e.Latitude == 'number' && typeof e.Longitude == 'number')
			// @ts-expect-error
			.map((e) => L.marker([e.Latitude, e.Longitude]));

		marker_group?.clearLayers();
		marker_group = L.featureGroup(visible_markers).addTo(map);

		const bounds = marker_group.getBounds();

		if (bounds.isValid()) map.fitBounds(bounds);
	});
</script>

<svelte:window on:resize={() => map?.invalidateSize()} />
<div bind:this={map_el}></div>

<style>
	div {
		position: sticky;
		top: 0;
		width: 100%;
		height: 10rem;
	}
</style>
