<script lang="ts">
	let x: string = '';
	type card = { id: number };
	let promise;
	async function saveCard() {
		try {
			const res = await fetch('/cards/', { method: 'POST' });
			const json = await res.json();
			return json;
		} catch (e) {
			return null;
		}
	}
	function submit(ev: SubmitEvent) {
		ev.preventDefault();
		promise = saveCard();
	}
</script>

{#await promise}
	Tallennetaan
{:then _}
	Tallennettu
{/await}

<form on:submit={submit}>
	<label for="content">Kortin teksti</label> <textarea id="content" />
	<label for="contentType">Kortin tyyppi</label>
	<input id="contentType" type="radio" />
	<button type="submit">Tallenna</button>
</form>
