/** @type {{bib: import('$lib/types').Living_Bibliography | undefined, visible_markers: import('$lib/types').Entry[]}} */
export let bib_state = $state({ bib: undefined });

/** @param {import('$lib/types').Living_Bibliography} new_bib */
export function set_bib(new_bib) {
	bib_state.bib = new_bib;
}

/** @param {import('$lib/types').Entry[]} new_markers */
export function set_visible_markers(new_markers) {
	console.log('Setting visible markers');
	bib_state.visible_markers = new_markers;
}
