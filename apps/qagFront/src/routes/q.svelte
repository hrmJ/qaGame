<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		initialize();
	});
	let usedQuestionIds: string[] = [];
	function initialize() {
		usedQuestionIds = [];
	}
	function markQuestionUsed(id?: string) {
		if (!id) return;
		usedQuestionIds = [...usedQuestionIds, id];
	}
</script>

<Card contentType="q" usedIds={usedQuestionIds} onCardLoaded={markQuestionUsed} />

<button on:click={initialize}>Aloita alusta</button>
