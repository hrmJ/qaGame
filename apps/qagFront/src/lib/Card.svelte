<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCard } from './services';
	let cardLoadstate: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let card: Card | null;
	let error: string = '';
	type ContentType = 'q' | 'a';
	type TextDict = Record<ContentType, string>;
	const noItemsTextBase = 'Kukaan ei ole lisännyt';
	const buttonTexts: TextDict = { a: 'Uusi vastaus', q: 'Uusi kysymys' };
	const noItemsTexts: TextDict = {
		a: `${noItemsTextBase} vastauksia`,
		q: `${noItemsTextBase} kysymyksiä`
	};
	export let contentType: ContentType;
	export let usedIds: string[] | undefined = undefined;
	export let onCardLoaded: undefined | OnCardLoaded = undefined;
	interface Card {
		contentType: 'q' | 'a';
		text: string;
		id: string;
	}
	type OnCardLoaded = (id?: string) => unknown;
	onMount(() => {
		nextItem();
	});
	async function nextItem() {
		cardLoadstate = 'loading';
		card = await loadCard(contentType, usedIds).catch((currentError: Error) => {
			error = currentError?.message.replace('Error: ', '') ?? 'Lataus ei onnistu';
			cardLoadstate = 'error';
			return null;
		});
		onCardLoaded && onCardLoaded(card?.id);
		cardLoadstate = 'success';
	}
</script>

<article>
	{#if cardLoadstate === 'loading'}
		<!-- skeleton state -->
	{:else if cardLoadstate === 'success'}
		{card === null ? noItemsTexts[contentType] : card?.text ?? ''}
	{:else if cardLoadstate === 'error'}
		{error}
	{/if}

	<button on:click={nextItem}>{buttonTexts[contentType]}</button>
</article>
