<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCard } from './services';
	let cardLoadstate: Promise<Card> | null;
	type ContentType = 'q' | 'a';
	type TextDict = Record<ContentType, string>;
	const noItemsTextBase = 'Kukaan ei ole lisännyt';
	const buttonTexts: TextDict = { a: 'Uusi vastaus', q: 'Uusi kysymys' };
	const noItemsTexts: TextDict = {
		a: `${noItemsTextBase} vastauksia`,
		q: `${noItemsTextBase} kysymyksiä`
	};
	export let contentType: ContentType;
	interface Card {
		contentType: 'q' | 'a';
		text: string;
	}
	onMount(() => {
		nextItem();
	});
	const nextItem = () => (cardLoadstate = loadCard(contentType));
</script>

<article>
	{#await cardLoadstate}
		<!-- skeleton state -->
	{:then card}
		{card === null ? noItemsTexts[contentType] : card?.text ?? ''}
	{:catch err}
		{err.message}
	{/await}

	<button on:click={nextItem}>{buttonTexts[contentType]}</button>
</article>
