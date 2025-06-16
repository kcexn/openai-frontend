<script>
	import '../app.css';
	import { initializeAuth0Client } from '$lib/services/auth0.service';
	import { onMount } from 'svelte';

	onMount(() => {
		initializeAuth0Client();
	});
	let { children } = $props();
</script>

<div class="group/design-root design-root-layout">
	{@render children()}
</div>

<style lang="postcss">
	.design-root-layout {
		@apply relative flex size-full min-h-screen flex-col overflow-x-hidden bg-slate-50;
		font-family: Inter, 'Noto Sans', sans-serif;
	}
</style>
