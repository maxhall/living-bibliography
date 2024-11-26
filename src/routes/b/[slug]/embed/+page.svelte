<script>
	import { page } from '$app/stores';
	import { dedupe_string_array } from '$lib/utils';
	import { LibraryBig, Tags } from 'lucide-svelte';
	/** @type {{data: import('./$types').PageServerData}}} */
	let { data } = $props();

	const bib = data.bib_data;
	console.log(bib);
	console.log($page.params.slug);
	const tag_count = dedupe_string_array(bib.entries.flatMap((e) => e.Tags)).length;
</script>

<div class="wrapper">
	<main>
		<p class="details">
			<LibraryBig size={18} />
			<span class="ttt">
				{bib.entries.length} sources
			</span>
			<Tags size={18} />
			<span class="ttt">
				{tag_count} tags
			</span>
		</p>
		<h1>{bib.info.Title}</h1>
		<h3>
			{bib.info.Subtitle}
		</h3>
		<a href="/b/{$page.params.slug}" target="_blank">View living bibliography</a>
	</main>
</div>

<style>
	.details {
		display: flex;
		align-items: center;
		gap: 0.1rem;
		color: var(--ochre);
		justify-content: center;
	}

	.details > span:first-of-type {
		margin-right: 0.5rem;
	}

	.details > span {
		color: var(--ochre);
	}

	.wrapper {
		background-color: var(--sandstone);
		height: 100%;
		text-align: center;
		display: grid;
		align-items: center;
	}

	main {
		max-height: 30rem;
		padding: 1rem;
	}

	h3 {
		margin-bottom: 1.5rem;
		color: var(--charcoal);
	}

	a {
		font-size: 20px;
		color: var(--accessible-ochre);
		user-select: none;
		width: 100%;
		background-color: var(--sandstone);
		border: 2px solid var(--ochre);
		padding: 0.25rem;
		display: inline-block;
		width: fit-content;
		margin: 0;
		text-decoration: none;
	}

	a:hover {
		background-color: var(--ochre);
		color: var(--white);
	}

	a:focus {
		outline: 2px solid var(--ochre);
		outline-offset: 2px;
	}
</style>
