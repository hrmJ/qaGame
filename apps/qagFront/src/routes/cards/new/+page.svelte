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

<main>
	<div>
		<h2>Lisää uusi kysymys tai vastaus</h2>
		<form on:submit={submit}>
			<div>
				<label for="content">Kortin teksti</label> <textarea id="content" bind:value={card.text} />
			</div>

			<div>
				<label for="contentType1">Kysymys</label>
				<input
					id="contentType1"
					type="radio"
					value="q"
					name="contentType"
					bind:group={card.contentType}
				/>
			</div>

			<div>
				<label for="contentType2">Vastaus</label>
				<input
					id="contentType2"
					type="radio"
					value="a"
					name="contentType"
					bind:group={card.contentType}
				/>
			</div>

			<div class="button-container">
				<button type="submit">Tallenna</button>
			</div>
		</form>
	</div>
</main>

<style>
	form {
		font-size: var(--font-sm-2);
	}
	textarea {
		min-width: 300px;
		min-height: 200px;
	}
	.button-container {
		justify-content: flex-end;
	}

	form > div {
		margin-bottom: var(--margin-lg);
		display: flex;
	}

	form > div > label {
		display: block;
		width: 10em;
	}
</style>
