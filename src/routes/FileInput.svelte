<script>
	import { read_XLSX } from '$lib/read_XLSX';
	import { slide } from 'svelte/transition';

	/** @type {{on_success: (bib: import('$lib/types').Living_Bibliography) => void}} */
	let { on_success } = $props();

	/** @type {null | FileList} */
	let files = $state(null);
	/** @type {string[]} */
	let errors = $state([]);

	function handle_change() {
		if (!(files && files[0])) return;

		const file = files[0];
		const reader = new FileReader();

		reader.addEventListener('load', async () => {
			const workbook = reader.result;

			if (workbook == null || typeof workbook !== 'object') {
				errors = [`Could not read ${file.name}. Please try again.`];
				return;
			}

			const read_result = await read_XLSX(workbook);

			if (read_result.ok) {
				errors = [];

				console.log(read_result.data);

				return on_success(read_result.data);
			} else {
				errors = read_result.errors;
			}
		});

		reader.readAsArrayBuffer(files[0]);
	}
</script>

<input
	bind:files
	onchange={handle_change}
	type="file"
	id="open-file"
	name="open-file"
	accept=".xlsx"
	class="visually-hidden"
/>
<label class="buttonesque" for="open-file">Upload file</label>

{#if errors.length > 0}
	<div class="errors" transition:slide>
		<p>Unable to open bibliography file</p>
		<ul>
			{#each errors as error_message}
				<li>{error_message}</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	label {
		color: var(--accessible-ochre);
		user-select: none;
		width: 100%;
		background-color: var(--sandstone);
		border: 2px solid var(--ochre);
		padding: 0.25rem;
		display: inline-block;
		width: fit-content;
		margin: 0 0 0.5rem 0;
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
	}

	input:hover + label,
	label:hover {
		background-color: var(--ochre);
		color: var(--white);
	}

	input:focus + label {
		outline: 2px solid var(--ochre);
		outline-offset: 2px;
	}

	.errors {
		border: 2px solid var(--ochre);
		background: var(--white);
		padding: 0.5rem;
		margin: 0 0 1rem 0;
	}

	.errors p {
		font-weight: 600;
		color: var(--accessible-ochre);
	}

	.errors ul {
		margin-left: 0.5rem;
	}

	.errors li {
		color: var(--black);
		list-style: square;
	}
</style>
