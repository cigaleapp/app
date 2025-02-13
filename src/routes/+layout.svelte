<script>
	import './style.css';
	//import Icon from '@iconify/svelte'; //use <Icon icon="ph:nameoficon" />
	const { children } = $props();
</script>

{@render children?.()}

<style>
	:root {
		--corner-radius: 7px;
		--border-thickness: 1px;
	}
</style>
