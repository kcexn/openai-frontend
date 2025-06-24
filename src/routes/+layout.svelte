<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="group/design-root design-root-layout">
	{@render children?.()}
</div>

<style lang="postcss">
	.design-root-layout {
		@apply relative flex size-full min-h-screen flex-col overflow-x-hidden bg-slate-50;
		font-family: Inter, 'Noto Sans', sans-serif;
	}
</style>
