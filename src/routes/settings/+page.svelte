<script lang="ts">
	import { Header, ActionButton } from '$lib/components';
	import { logout as serviceLogout } from '$lib/services/auth0.service';
	import { GearIcon, AvatarIcon } from '$lib/components/icons';
</script>

<div class="layout-container flex h-full grow flex-col">
	<Header>
		{#snippet actions()}
			<ActionButton href="/settings">
				{#snippet icon()}
					<GearIcon />
				{/snippet}
			</ActionButton>
			<AvatarIcon />
		{/snippet}
	</Header>
	<div class="settings-content-wrapper">
		<div class="settings-inner-container">
			<div class="settings-title-container">
				<p class="settings-page-title">Settings</p>
			</div>
			<h3 class="settings-section-title">Account</h3>
			<button
				class="settings-item-container settings-logout-action"
				onclick={() => serviceLogout()}
			>
				<div class="settings-item-text-wrapper">
					<p class="settings-item-title">Logout</p>
				</div>
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.settings-content-wrapper {
		@apply flex flex-1 justify-center px-40 py-5;
	}
	.settings-inner-container {
		@apply flex w-[512px] max-w-[512px] flex-1 flex-col py-5;
	}
	.settings-title-container {
		@apply flex flex-wrap justify-between gap-3 p-4;
	}
	.settings-page-title {
		@apply min-w-72 text-[32px] font-bold leading-tight tracking-tight text-[#0d141c];
	}
	.settings-section-title {
		@apply px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#0d141c];
	}
	.settings-item-container {
		@apply flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2;
	}
	.settings-logout-action {
		@apply w-full cursor-pointer text-left hover:bg-slate-100;
	}
	.settings-item-text-wrapper {
		@apply flex flex-col justify-center;
	}
	.settings-item-title {
		@apply line-clamp-1 text-base font-medium leading-normal text-[#0d141c];
	}
</style>
