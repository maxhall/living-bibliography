<script>
	/** @type {{entries: import('$lib/types').Entry[]}} */
	let { entries } = $props();
	import { required_entry_keys } from '$lib/constants';
</script>

<section>
	<p>
		{#each required_entry_keys as key}
			{key}
		{/each}
	</p>
	{#each entries as entry}
		<p>
			{#each required_entry_keys as key}
				{entry[key]}
			{/each}
		</p>
	{/each}
</section>
