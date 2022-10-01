<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		initialize();
	});
	let usedQuestionIds: string[] = [];
	let gameEnded = false;
	function initialize() {
		gameEnded = false;
		usedQuestionIds = [];
	}
	function markQuestionUsed(id?: string) {
		if (!id) return;
		usedQuestionIds = [...usedQuestionIds, id];
	}
	function endGame() {
		gameEnded = true;
	}
</script>

<Card
	contentType="q"
	usedIds={usedQuestionIds}
	onCardLoaded={markQuestionUsed}
	on:status={endGame}
	{gameEnded}
/>

{#if gameEnded}
	<p>Kysymykset loppuivat. Kiitos pelistä!</p>
{/if}
<button on:click={initialize}>Aloita alusta</button>
