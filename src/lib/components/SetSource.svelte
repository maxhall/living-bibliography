<script>
	import FileInput from '$lib/components/FileInput.svelte';
	import CentredPanel from './CentredPanel.svelte';

	/** @type {{on_success: (bib: import('$lib/types').Living_Bibliography) => void}} */
	let { on_success } = $props();
</script>

<CentredPanel>
	<h2>View a living bibliography</h2>
	<FileInput {on_success} />
	<p>
		To view an Excel file containing a living bibliography, click open file. The contents are not
		shared with anyone else .
	</p>
	<h2>Create your own</h2>
	<p>A living bibliography is created from data in a Excel spreadsheet. To make your own:</p>
	<ol>
		<li>
			<a href="/Living-bibliography-template.xlsx">Download the template (XLSX, 11kb)</a> and add your
			bibliography
		</li>
		<li>View the bibliography using the button above</li>
		<li>To share your bibliography with others, send the Excel file and a link to this page.</li>
	</ol>
	<p>
		We invite University of Sydney colleagues to contact the Sydney Policy Lab to discuss publishing
		their living biolgraphies on this site.
	</p>
</CentredPanel>
