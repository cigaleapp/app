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
		background: var(--fg-primary);
		border: none;
		border-radius: 1.5em;
	}

	button::before {
		content: '';
		position: absolute;
		width: 1.3em;
		height: 1.3em;
		background: var(--bg-neutral);
		top: 0.13em;
		right: 1.5em;
		transition: transform 0.3s;
		border-radius: 100%;
	}

	button[aria-checked='true'] {
		background-color: var(--bg-primary);
	}

	button[aria-checked='true']::before {
		transform: translateX(1.3em);
		transition: transform 0.3s;
	}

	button:hover[aria-checked='true'] {
		box-shadow: 0 0px 5px var(--bg-primary);
		border-radius: 1.5em;
	}

	button:hover {
		box-shadow: 0 0px 5px var(--fg-primary);
		border-radius: 1.5em;
	}

	button:focus[aria-checked='true'] {
		box-shadow: 0 0px 8px var(--bg-primary);
		border-radius: 1.5em;
	}

	button:focus {
		box-shadow: 0 0px 8px var(--fg-primary);
		border-radius: 1.5em;
	}

	.s--dayNight::before {
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjMyLjEzIDE0My42NGE2IDYgMCAwIDAtNi0xLjQ5YTkwLjA3IDkwLjA3IDAgMCAxLTExMi4yNy0xMTIuM2E2IDYgMCAwIDAtNy40OS03LjQ4YTEwMi44OCAxMDIuODggMCAwIDAtNTEuODkgMzYuMzFhMTAyIDEwMiAwIDAgMCAxNDIuODQgMTQyLjg0YTEwMi44OCAxMDIuODggMCAwIDAgMzYuMzEtNTEuODlhNiA2IDAgMCAwLTEuNS01Ljk5bS00MiA0OC4yOWE5MCA5MCAwIDAgMS0xMjYtMTI2YTkwLjkgOTAuOSAwIDAgMSAzNS41Mi0yOC4yN2ExMDIuMDYgMTAyLjA2IDAgMCAwIDExOC42OSAxMTguNjlhOTAuOSA5MC45IDAgMCAxLTI4LjI0IDM1LjU4WiIvPjwvc3ZnPg==');
		background-size: cover;
	}

	.s--dayNight[aria-checked='true']::before {
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIyIDQwdi04YTYgNiAwIDAgMSAxMiAwdjhhNiA2IDAgMCAxLTEyIDBtNjggODhhNjIgNjIgMCAxIDEtNjItNjJhNjIuMDcgNjIuMDcgMCAwIDEgNjIgNjJtLTEyIDBhNTAgNTAgMCAxIDAtNTAgNTBhNTAuMDYgNTAuMDYgMCAwIDAgNTAtNTBNNTkuNzYgNjguMjRhNiA2IDAgMSAwIDguNDgtOC40OGwtOC04YTYgNiAwIDAgMC04LjQ4IDguNDhabTAgMTE5LjUybC04IDhhNiA2IDAgMSAwIDguNDggOC40OGw4LThhNiA2IDAgMSAwLTguNDgtOC40OG0xMzYtMTM2bC04IDhhNiA2IDAgMSAwIDguNDggOC40OGw4LThhNiA2IDAgMCAwLTguNDgtOC40OG0uNDggMTM2YTYgNiAwIDAgMC04LjQ4IDguNDhsOCA4YTYgNiAwIDAgMCA4LjQ4LTguNDhaTTQwIDEyMmgtOGE2IDYgMCAwIDAgMCAxMmg4YTYgNiAwIDAgMCAwLTEybTg4IDg4YTYgNiAwIDAgMC02IDZ2OGE2IDYgMCAwIDAgMTIgMHYtOGE2IDYgMCAwIDAtNi02bTk2LTg4aC04YTYgNiAwIDAgMCAwIDEyaDhhNiA2IDAgMCAwIDAtMTIiLz48L3N2Zz4=');
		background-size: cover;
	}

	.s--crossCheck::before {
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjAyLjgzIDE5Ny4xN2E0IDQgMCAwIDEtNS42NiA1LjY2TDEyOCAxMzMuNjZsLTY5LjE3IDY5LjE3YTQgNCAwIDAgMS01LjY2LTUuNjZMMTIyLjM0IDEyOEw1My4xNyA1OC44M2E0IDQgMCAwIDEgNS42Ni01LjY2TDEyOCAxMjIuMzRsNjkuMTctNjkuMTdhNCA0IDAgMSAxIDUuNjYgNS42NkwxMzMuNjYgMTI4WiIvPjwvc3ZnPg==');
		background-size: cover;
	}

	.s--crossCheck[aria-checked='true']::before {
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMjI4LjI0IDc2LjI0bC0xMjggMTI4YTYgNiAwIDAgMS04LjQ4IDBsLTU2LTU2YTYgNiAwIDAgMSA4LjQ4LTguNDhMOTYgMTkxLjUxTDIxOS43NiA2Ny43NmE2IDYgMCAwIDEgOC40OCA4LjQ4Ii8+PC9zdmc+');
		background-size: cover;
	}
</style>
