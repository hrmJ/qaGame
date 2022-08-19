<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCard } from './services';
	let cardLoadstate: Promise<Card> | null;
	export let contentType: 'q' | 'a';
	const noItemsTextBase = 'Kukaan ei ole lisännyt';
	const noItemsText =
		contentType === 'q' ? `${noItemsTextBase} kysymyksiä` : `${noItemsTextBase} vastauksia`;
	interface Card {
		contentType: 'q' | 'a';
		text: string;
	}
	onMount(() => {
		nextItem();
	});
	function nextItem() {
		cardLoadstate = loadCard(contentType);
	}
</script>

<article>
	{#await cardLoadstate}
		Ladataan korttia
	{:then card}
		{card === null ? noItemsText : card?.text ?? ''}
	{:catch err}
		{err.message}
	{/await}

	<button on:click={nextItem}>Uusi kysymys</button>
</article>
