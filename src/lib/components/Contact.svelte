<script>
	import { bib_state } from '$lib/state.svelte';
	import { NotebookPen } from 'lucide-svelte';
</script>

<section>
	<div class="inner">
		<NotebookPen absoluteStrokeWidth={true} size={70} strokeWidth={3} color={'var(--ochre)'} />
		<div class="text">
			<h2 id="contribute">Get involved</h2>
			{@html bib_state.bib?.info['Contact text']}
			<a
				class="rounded-link"
				href="mailto:{bib_state.bib?.info[
					'Contact email'
				]}?subject=Living bibliography contribution">Contact us</a
			>
		</div>
	</div>
</section>

<style>
	section {
		background-color: var(--sandstone);
		padding: 1rem;
	}

	.inner {
		max-width: 40rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 5fr;
		gap: 0.5rem;
	}

	h2 {
		color: var(--ochre);
		margin-top: 0;
	}

	.text {
		max-width: 35ch;
	}
</style>
