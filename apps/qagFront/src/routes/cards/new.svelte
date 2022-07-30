<script lang="ts">
	import { saveCard } from '$lib/services';

	let cardSaveState: Promise<Response> | null;
	interface Card {
		contentType: 'q' | 'a';
		text: string;
	}
	let card: Card = { contentType: 'q', text: '' };
	function submit(ev: SubmitEvent) {
		ev.preventDefault();
		cardSaveState = saveCard(card);
		setTimeout(() => (cardSaveState = null), 3000);
		return cardSaveState;
	}
</script>

{#await cardSaveState}
	Tallennetaan
{:then res}
	{#if res}
		Tallennettu
	{/if}
{:catch err}
	{err.message}
{/await}

<form on:submit={submit}>
	<label for="content">Kortin teksti</label> <textarea id="content" bind:value={card.text} />

	<label for="contentType1">Kysymys</label>
	<input
		id="contentType1"
		type="radio"
		value="q"
		name="contentType"
		bind:group={card.contentType}
	/>

	<label for="contentType2">Vastaus</label>
	<input
		id="contentType2"
		type="radio"
		value="a"
		name="contentType"
		bind:group={card.contentType}
	/>

	<button type="submit">Tallenna</button>
</form>
