<script>
	import { onMount } from 'svelte';
	import { bib_state } from '$lib/state.svelte';
	import 'leaflet/dist/leaflet.css';

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
		map = L.map(map_el, { scrollWheelZoom: false, zoomControl: false }).setView([-30, 135], 4);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
			attribution: '©OpenStreetMap, ©CartoDB'
		}).addTo(map);
	});

	$effect(() => {
		bib_state.visible_markers;

		if (!map) return;
		if (bib_state.visible_markers) {
			const icon = L.divIcon({ className: 'bib-icon' });
			/** @type {import('leaflet').Marker[]}*/
			const visible_markers = bib_state.visible_markers
				.filter((s) => typeof s.Latitude == 'number' && typeof s.Longitude == 'number')
				.map((s) =>
					// @ts-expect-error
					L.marker([s.Latitude, s.Longitude], { icon })
				);

			marker_group?.clearLayers();
			marker_group = L.featureGroup(visible_markers).addTo(map);

			const bounds = marker_group.getBounds();

			if (bounds.isValid()) map.fitBounds(bounds);
		}
	});
</script>

<svelte:window on:resize={() => map?.invalidateSize()} />
<div class="wrapper">
	<div class="inner" bind:this={map_el}></div>
</div>

<style>
	.wrapper {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		display: grid;
		z-index: -10;
	}

	.inner {
		align-self: center;
		height: var(--narrative-map-max-height);
		width: 100%;
		max-height: var(--narrative-map-max-height);
		max-width: var(--narrative-width);
		margin: 0 auto;
	}

	:global(.bib-icon) {
		height: 1rem;
		width: 1rem;
		background-color: var(--ochre);
		border-radius: 50%;
	}

	:global(.bib-icon:hover) {
		outline: 1px solid var(--ochre);
		outline-offset: 2px;
	}
</style>
