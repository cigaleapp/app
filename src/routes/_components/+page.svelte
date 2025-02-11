<script>
	import { goto } from '$app/navigation';

	let componentName = $state('');
</script>

<input type="text" bind:value={componentName} />

<button
	onclick={() => {
		goto(`/_components/${componentName}`);
	}}
>
	Aller à /_components/{componentName}
</button>
