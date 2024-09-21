/** @type {{bib: import('$lib/types').Living_Bibliography | undefined, visible_markers: import('$lib/types').Entry[], selected_tag: string | null, highlighted_tag: string | null, highlighted_source: string | null}} */
export let bib_state = $state({
	bib: undefined,
	visible_markers: [],
	selected_tag: null,
	highlighted_tag: null,
	highlighted_source: null
});

/** @param {import('$lib/types').Living_Bibliography} new_bib */
export function set_bib(new_bib) {
	bib_state.bib = new_bib;
}

/** @param {import('$lib/types').Entry[]} new_markers */
export function set_visible_markers(new_markers) {
	console.log('Setting visible markers');
	bib_state.visible_markers = new_markers;
}
