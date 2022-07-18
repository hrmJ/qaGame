<script lang="ts">
	let cardSaveState: Promise<void>;
	async function saveCard() {
		const res = await fetch('/cards/', { method: 'POST' }).catch(() => null);
		if (!res?.ok) throw new Error('Tallentaminen ei onnistunut');
	}
	function submit(ev: SubmitEvent) {
		ev.preventDefault();
		cardSaveState = saveCard();
	}
</script>

{#await cardSaveState}
	Tallennetaan
{:then _}
	Tallennettu
{:catch err}
	{err.message}
{/await}

<form on:submit={submit}>
	<label for="content">Kortin teksti</label> <textarea id="content" />
	<label for="contentType">Kortin tyyppi</label>
	<input id="contentType" type="radio" />
	<button type="submit">Tallenna</button>
</form>
