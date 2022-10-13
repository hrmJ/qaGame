<script lang="ts">
	const useMsw = import.meta.env.DEV;
	import '../app.css';
	let isReady = !useMsw;

	if (useMsw && false) {
		import('$msw').then((res) => res.inject()).then(() => (isReady = true));
	} else {
		isReady = true;
	}
</script>

{#if isReady}
	<slot />
{/if}
