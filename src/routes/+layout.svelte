<script lang="ts">
	let { children } = $props();
</script>
<div
	class="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
	style="font-family: Inter, 'Noto Sans', sans-serif;"
>
    {@render children()}
</div>
