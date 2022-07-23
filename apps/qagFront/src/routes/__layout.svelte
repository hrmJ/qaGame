<script lang="ts">
	const useMsw = import.meta.env.DEV;
	let isReady = !useMsw;

	if (useMsw) {
		import('$msw').then((res) => res.inject()).then(() => (isReady = true));
	}
</script>

{#if isReady}
	<slot />
{/if}
