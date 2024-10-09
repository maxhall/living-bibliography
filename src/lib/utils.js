import { parse } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// TODO: Return errors to warn of bad content
// TODO: Add allowlist
/** @param {string} unsafe_content */
export function parse_content_to_markdown(unsafe_content) {
	return DOMPurify.sanitize(/** @type {string} */ (parse(unsafe_content)), {
		USE_PROFILES: { html: true }
	});
}

/** @param {string[]} arr */
export const dedupe_string_array = (arr) => Array.from(new Set([...arr]));
