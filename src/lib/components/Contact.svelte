<script>
	import { NotebookPen } from 'lucide-svelte';
</script>

<section>
	<div class="inner">
		<NotebookPen absoluteStrokeWidth={true} size={70} strokeWidth={3} color={'var(--ochre)'} />
		<div class="text">
			<h2>Get involved</h2>
			<p>
				This living bibliography isn't complete. We are adding sources and updating as our work
				continues and thinking changes. If there are sources you think we should add or you wish to
				discuss the contents, please get in touch.
			</p>
			<a class="rounded-link" href="mailto:policy.lab@sydney.edu.au">Contact us</a>
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
	}

	.text {
		max-width: 35ch;
	}
</style>
