<script lang="ts">
	import { onMount } from 'svelte';
	let cardLoadstate: Promise<Card> | null;
	export let contentType: 'q' | 'a';
	interface Card {
		contentType: 'q' | 'a';
		text: string;
	}
	const apiUrl = 'http://localhost:3000';
	async function loadCard() {
		const res = await fetch(`${apiUrl}/cards/${contentType}`, {
			headers: { 'Content-Type': 'application/json' }
		}).catch(() => null);
		if (!res?.ok) throw new Error('Lataaminen ei onnistunut');
		return await res.json();
	}
	onMount(() => {
		cardLoadstate = loadCard();
	});
</script>

<article>
	{#await cardLoadstate}
		Ladataan korttia
	{:then card}
		{card?.text ?? ''}
	{:catch err}
		{err.message}
	{/await}
</article>
