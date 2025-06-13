<script lang="ts">
	let { icon, href } = $props();
</script>

<a {href} class="action-button">
	{@render icon?.()}
</a>

<style lang="postcss">
	.action-button {
		@apply flex h-10 min-w-0 max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#e7edf4] px-2.5 text-sm font-bold leading-normal tracking-[0.015em] text-[#0d141c];
	}
</style>
