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
		markers = L.markerClusterGroup({
			iconCreateFunction: function (cluster) {
				return L.divIcon({
					className: 'bib-icon-cluster',
					html: '<p>' + cluster.getChildCount() + '</p>',
					iconSize: [26, 26],
					iconAnchor: [13, 13]
				});
			},
			polygonOptions: {
				fillColor: 'var(--heritage-rose)',
				color: 'var(--heritage-rose)',
				weight: 2,
				opacity: 1,
				fillOpacity: 0.5
			}
		})
			.addLayers(visible_markers)
			.addTo(map);
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

	:global(.bib-icon-cluster) {
		background-color: var(--ochre);
		border-radius: 50%;
		display: grid;
		place-items: center;
	}

	:global(.bib-icon-cluster:hover) {
		outline: 2px solid var(--ochre);
		outline-offset: 2px;
	}

	:global(.bib-icon-cluster > p) {
		font-size: 16px;
		font-weight: 500;
		color: var(--white);
		line-height: 1;
		margin: 0;
		letter-spacing: -0.25px;
		transform: translateY(-1.5px);
	}
</style>
