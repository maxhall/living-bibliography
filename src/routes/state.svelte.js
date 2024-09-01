/** @type {{bib: import('$lib/types').Living_Bibliography | undefined}} */
export let bib_state = $state({ bib: undefined });

/** @param {import('$lib/types').Living_Bibliography} new_bib */
export function set_bib(new_bib) {
	bib_state.bib = new_bib;
}
