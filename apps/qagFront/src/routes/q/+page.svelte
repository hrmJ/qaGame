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

<main>
	{#if !gameEnded}
		<Card
			contentType="q"
			usedIds={usedQuestionIds}
			onCardLoaded={markQuestionUsed}
			on:status={endGame}
			{gameEnded}
		/>
	{:else}
		<article>
			<p>Kysymykset loppuivat. Kiitos pelistä!</p>
			<footer><button on:click={initialize}>Aloita alusta</button></footer>
		</article>
	{/if}
</main>

<style>
	article {
	}
</style>
