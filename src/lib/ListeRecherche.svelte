<script>
	import { onMount } from 'svelte';

	let { items, searchQuery, filteredItems, selectedvalue } = $props();

	onMount(() => {
		// Example items, replace with your data
		items = [
			'Apple',
			'Banana',
			'Cherry',
			'Date',
			'Elderberry',
			'Fig',
			'Grape',
			'Honeydew',
			'Kiwi',
			'Lemon',
			'Mango',
			'Nectarine',
			'Orange',
			'Papaya',
			'Quince',
			'Raspberry',
			'Strawberry',
			'Tomato',
			'Ugli fruit',
			'Vanilla',
			'Watermelon',
			'Xigua',
			'Yellow passion fruit',
			'Zucchini'
		];
		filteredItems = items;
	});

	function handleSearch(event) {
		searchQuery = event.target.value.toLowerCase();
		filteredItems = items.filter((item) => item.toLowerCase().includes(searchQuery));
	}
</script>

<div>
	<input class="search-bar" type="text" placeholder="Search..." oninput={handleSearch} />

	<div class="container">
		{#each filteredItems as item}
			<div>
				<button class="button" onclick={() => (selectedvalue = item)}>
					{item}
				</button>
			</div>
		{/each}
	</div>
	Vous avez choisi : {selectedvalue}
</div>

<style>
	.container {
		max-height: 100px;
		overflow-y: auto;
		border: 1px solid #ccc;
		padding: 10px;
	}
	.search-bar {
		margin-bottom: 10px;
	}
	.button {
		width: 100%;
		padding: 10px;
		margin: 5px 0;
		background-color: #f0f0f0;
		border: 1px solid;
		border-radius: 5px;
		cursor: pointer;
		text-align: left;
	}
</style>
