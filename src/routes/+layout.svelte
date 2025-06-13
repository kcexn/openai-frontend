<script>
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="group/design-root relative flex size-full min-h-screen flex-col overflow-x-hidden bg-slate-50"
	style="font-family: Inter, 'Noto Sans', sans-serif;"
>
	{@render children()}
</div>
