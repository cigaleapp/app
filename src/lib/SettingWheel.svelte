<script>
	import Icon from '@iconify/svelte';
	let isActive = false;
	let isDivActive = false;

	function handleClick() {
		isActive = !isActive;
		isDivActive = !isDivActive;
	}
</script>

<div class:isDivActive class="container" aria-pressed={isDivActive}>
	<button class:isActive onclick={handleClick} aria-pressed={isActive} type="button">
		<Icon class="icon" icon="ph:gear-light" />
	</button>
</div>

<style>
	:root {
		font-size: em;
		color: var(--fg-primary);
	}

	.isDivActive {
		background-color: var(--bg-primary);
	}

	button {
		position: fixed;
		display: flex;
		color: var(--color);
		background: none;
		border: none;
		cursor: pointer;
	}

	button:hover {
		color: #35c8bf;
	}

	.isActive {
		position: fixed;
		display: flex;
		color: red;
		transform: rotate(360deg);
		transition: transform 1s ease-in-out;
	}

	.isDivActive {
		position: fixed;
		display: flex;
		height: 1vh;
		width: 1vw;
		background-color: var(--bg-primary);
		transition: background-color 1s ease-in-out;
	}
</style>
