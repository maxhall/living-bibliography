<script>
	import FileInput from '$lib/components/FileInput.svelte';
	import CentredPanel from './CentredPanel.svelte';

	/** @type {{on_success: (bib: import('$lib/types').Living_Bibliography) => void}} */
	let { on_success } = $props();
</script>

<CentredPanel>
	<h2>Open a living bibliography</h2>
	<p>Upload an Excel Workbook.</p>
	<FileInput {on_success} />
	<h2>Make your own</h2>
	<p>A living bibliography is created from data in an Excel Spreadsheet.</p>
	<ol>
		<li>
			Download and fill out <a href="/Living bibliography template.xlsx"
				>the template (XLSX, 11kb)</a
			>
		</li>
		<li>Upload the file using the button above</li>
		<li>[TBC] Decide how to publish your bibliography.</li>
	</ol>
</CentredPanel>
