<script>
	import { bib_state } from './state.svelte';
	import { onMount } from 'svelte';

	let last_id = 0;

	onMount(() => {
		if (!bib_state.bib) return;

		/** @type {{id: number, type: 'source' | 'tag', title: string }[]} */
		const nodes = [];
		/** @type {[number, number][]}*/
		const links = [];

		/** @param {string} tag_title */
		const get_tag_id = (tag_title) =>
			nodes.find((n) => n.type == 'tag' && n.title == tag_title)?.id || last_id++;

		/** @param {[number, number]} ids */
		const add_link = ([a, b]) => {
			const already_exists = links.find((l) => l.includes(a) && l.includes(b));

			if (already_exists) return;

			links.push([a, b]);
		};

		bib_state.bib.entries.forEach((e) => {
			const source_id = last_id++;

			nodes.push({
				id: source_id,
				type: 'source',
				title: /** @type {string} */ (e.Title)
			});

			e.Tags.forEach((t) => {
				const tag_id = get_tag_id(t);

				add_link([source_id, tag_id]);
			});
		});

		console.log(nodes);
		console.log(links);
	});
</script>

<figure>
	<svg viewBox="0 0 100 100">
		<!-- {#if nodes}
			{#each nodes as n (n.index)}
				<g
					on:pointerenter={pause}
					on:pointerleave={resume}
					class="activity c-{n.type}"
					transform="translate({n.x}, {n.y})"
					in:fade|global={{ duration: 1500, delay: activity_type_params[n.type].intro }}
				>
					<circle r={n.r} />
					<LabelLine title={n.title} {line_length} />
				</g>
			{/each}
		{/if} -->
	</svg>
</figure>
