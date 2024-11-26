<script>
	import AboutContent from '$lib/components/AboutContent.svelte';
	import CentredPanel from '$lib/components/CentredPanel.svelte';
</script>

<svelte:head>
	<title>Living bibliographies</title>
	<meta
		name="description"
		content="Explore an interactive annotated bibliography or create your own. A project of the Sydney Policy Lab."
	/>
</svelte:head>

<CentredPanel>
	<div class="text-content">
		<h1>Living bibliographies</h1>
		<h2>Published bibliographies</h2>
		<ul>
			<li><a href="/b/campus-collaboration">The Campus Collaboration</a></li>
		</ul>
		<h2>Create your own</h2>
		<p>You can <a href="/viewer">create or view your own living bibliography.</a></p>
		<h2>About</h2>
		<AboutContent />
	</div>
</CentredPanel>

<style>
	h2 {
		margin: 1rem 0 0.5rem;
	}
</style>
