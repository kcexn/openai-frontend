<script lang="ts">
	let { actions, title = 'Chat' } = $props();
	import ShieldIcon from './icons/ShieldIcon.svelte';
</script>

<header data-sveltekit-preload-data="false" class="openai-header">
	<div class="flex items-center gap-4 text-[#0d141c]">
		<div class="size-4">
			<ShieldIcon />
		</div>
		<h2 class="openai-header-title">
			<a href="/">
				{title}
			</a>
		</h2>
	</div>
	<div class="flex flex-1 justify-end gap-8">
		{@render actions?.()}
	</div>
</header>

<style lang="postcss">
	.openai-header {
		@apply flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3;
	}

	.openai-header-title {
		@apply text-lg font-bold leading-tight tracking-[-0.015em] text-[#0d141c];
	}
</style>
