<script lang="ts">
	import { onMount } from 'svelte';
import { loadCard } from './services';
	let cardLoadstate: Promise<Card> | null;
	export let contentType: 'q' | 'a';
	interface Card {
		contentType: 'q' | 'a';
		text: string;
	}
	onMount(() => {
		cardLoadstate = loadCard(contentType);
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
