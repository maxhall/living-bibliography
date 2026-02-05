<script>
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

	/** @type {{entries: import('$lib/types').Entry[]}}*/
	let { entries } = $props();
	/** @type {undefined | HTMLDivElement} */
	let map_el;
	/** @type {undefined | import('leaflet').Map}*/
	let map;
	/** @type {typeof import('leaflet')}*/
	let L;
	/** @type {undefined | import('leaflet').MarkerClusterGroup}*/
	let markers;

	let blur = $derived(
		entries.filter((e) => typeof e.Latitude == 'number' && typeof e.Longitude == 'number')
			.length === 0
	);

	onMount(async () => {
		L = (await import('leaflet')).default;
		await import('leaflet.markercluster');

		// @ts-expect-error
		map = L.map(map_el, { zoomControl: false }).setView([-30, 135], 4);

		new L.Control.Zoom({ position: 'topright' }).addTo(map);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
			attribution: '©OpenStreetMap, ©CartoDB'
		}).addTo(map);

		set_markers();
	});

	$effect(() => {
		entries;

		set_markers();
	});

	function set_markers() {
		if (!map) return;

		const icon = L.divIcon({ className: 'bib-icon' });
		/** @type {import('leaflet').Marker[]}*/
		const visible_markers = entries
			.filter((e) => typeof e.Latitude == 'number' && typeof e.Longitude == 'number')
			.map((e) =>
				// @ts-expect-error
				L.marker([e.Latitude, e.Longitude], { icon }).bindPopup(e.Title, {
					className: 'map-popup',
					closeButton: false
				})
			);

		markers?.clearLayers();
		markers = L.markerClusterGroup().addLayers(visible_markers).addTo(map);
		const bounds = markers.getBounds();

		if (bounds.isValid()) map.fitBounds(bounds);
	}
</script>

<svelte:window on:resize={() => map?.invalidateSize()} />
<div class:blur bind:this={map_el}></div>

<style>
	div {
		width: 100%;
		height: 10rem;
	}

	.blur {
		filter: blur(2px);
	}
</style>
