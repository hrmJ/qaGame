<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCard } from './services';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
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
	export let gameEnded = false;
	interface Card {
		contentType: 'q' | 'a';
		text: string;
		id: string;
		status?: string;
	}
	type OnCardLoaded = (id?: string) => unknown;
	onMount(() => {
		nextItem();
	});

	function checkIfEnded(card: Card | null) {
		if (card?.status !== 'end') return;
		dispatch('status', 'end');
	}

	async function nextItem() {
		cardLoadstate = 'loading';
		card = await loadCard(contentType, usedIds).catch((currentError: Error) => {
			error = currentError?.message.replace('Error: ', '') ?? 'Lataus ei onnistu';
			cardLoadstate = 'error';
			return null;
		});
		checkIfEnded(card);
		onCardLoaded && onCardLoaded(card?.id);
		cardLoadstate = 'success';
	}
</script>

<article>
	<section>
		{#if cardLoadstate === 'loading'}
			<!-- skeleton state -->
		{:else if cardLoadstate === 'success'}
			{card === null ? noItemsTexts[contentType] : card?.text ?? ''}
		{:else if cardLoadstate === 'error'}
			{error}
		{/if}
	</section>
	<footer>
		{#if !gameEnded}
			<button on:click={nextItem}>{buttonTexts[contentType]}</button>
		{/if}
	</footer>
</article>

<style>
	article {
		width: 75vw;
		font-weight: 300;
		max-width: 700px;
		border: 1px solid var(--grey-300);
		padding: var(--padding-lg);
		border-radius: var(--border-radius-2);
		color: var(--grey-900);
		font-size: var(--font-md-1);
		background: white;
		box-shadow: var(--shadow-sm);
	}
	footer {
		display: flex;
		justify-content: end;
	}
</style>
