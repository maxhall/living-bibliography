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

	let blur = $derived(
		entries.filter((e) => typeof e.Latitude == 'number' && typeof e.Longitude == 'number')
			.length === 0
	);

	onMount(async () => {
		L = (await import('leaflet')).default;

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

		marker_group?.clearLayers();
		marker_group = L.featureGroup(visible_markers).addTo(map);

		const bounds = marker_group.getBounds();

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
