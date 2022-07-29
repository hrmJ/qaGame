<script lang="ts">
	let cardSaveState: Promise<Response> | null;
	async function saveCard() {
		const res = await fetch('/cards/', { method: 'POST' }).catch(() => null);
		if (!res?.ok) throw new Error('Tallentaminen ei onnistunut');
		return res;
	}
	function submit(ev: SubmitEvent) {
		ev.preventDefault();
		cardSaveState = saveCard();
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
	<label for="content">Kortin teksti</label> <textarea id="content" />
	<label for="contentType">Kortin tyyppi</label>
	<input id="contentType" type="radio" />
	<button type="submit">Tallenna</button>
</form>
