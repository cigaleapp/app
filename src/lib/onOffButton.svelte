<script>
	let { pushed = $bindable(), type = 'crossCheck' } = $props();

	function click() {
		pushed = !pushed;
	}
</script>

{#if type == 'dayNight'}
	<button
		class="s s--dayNight"
		role="switch"
		aria-checked={pushed}
		onclick={click}
		aria-labelledby="day and night"
	></button>
{:else}
	<button
		class="s s--crossCheck"
		role="switch"
		aria-checked={pushed}
		onclick={click}
		aria-labelledby="On off switch"
	></button>
{/if}

<style>
	button {
		display: flex;
		align-items: center;
		width: 3em;
		height: 1.6em;
		position: relative;
		margin: 0 0 0 0.5em;
		background: #2c004b;
		border: none;
		border-radius: 1.5em;
	}

	button::before {
		content: '';
		position: absolute;
		width: 1.3em;
		height: 1.3em;
		background: white;
		top: 0.13em;
		right: 1.5em;
		transition: transform 0.3s;
		border-radius: 100%;
	}

	button[aria-checked='true'] {
		background-color: #25c8bf;
	}

	button[aria-checked='true']::before {
		transform: translateX(1.3em);
		transition: transform 0.3s;
	}

	button:hover[aria-checked='true'] {
		box-shadow: 0 0px 5px #25c8bf;
		border-radius: 1.5em;
	}

	button:hover {
		box-shadow: 0 0px 5px #2c004b;
		border-radius: 1.5em;
	}

	button:focus[aria-checked='true'] {
		box-shadow: 0 0px 8px #25c8bf;
		border-radius: 1.5em;
	}

	button:focus {
		box-shadow: 0 0px 8px #2c004b;
		border-radius: 1.5em;
	}

	.s--dayNight::before {
		background-image: url('./moon-symbol-512.webp');
		background-size: cover;
	}

	.s--dayNight[aria-checked='true']::before {
		background-image: url('./sun-symbol-512.webp');
		background-size: cover;
	}

	.s--crossCheck::before {
		background-image: url('./cross-23.png');
		background-size: cover;
	}

	.s--crossCheck[aria-checked='true']::before {
		background-image: url('./OOjs_UI_icon_check.png');
		background-size: cover;
	}
</style>
