<script>
	import { read_XLSX } from './read_XLSX';

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
<label class="buttonesque" for="open-file">Load</label>
{#if errors.length > 0}
	{#each errors as error_message}
		<p>{error_message}</p>
	{/each}
{/if}

<style>
	label {
		user-select: none;
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
	}

	input:focus + label {
		outline: 1px solid grey;
		outline-offset: 2px;
	}
</style>
