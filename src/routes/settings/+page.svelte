<script lang="ts">
	import { onMount } from 'svelte';
	import { ActionButton, Header } from '$lib/components';
	import { CaretRightIcon } from '$lib/components/icons';
	import { waitForAuth, logout as serviceLogout } from '$lib/services/auth0.service';
	import { GearIcon, AvatarIcon } from '$lib/components/icons';
	import { settings } from '$lib/services/settings.service';

	let prompt = settings.prompt;
	const defaultPrompt = settings.defaultPrompt;

	onMount(() => {
		return waitForAuth(async () => {});
	});
</script>

<div class="layout-container flex h-full grow flex-col">
	<Header title="Chat">
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
			<h3 class="settings-section-title">Chatbot</h3>
			<div class="settings-accordion-container">
				<input type="checkbox" id="prompt-accordion-toggle" class="accordion-toggle" />
				<label for="prompt-accordion-toggle" class="settings-accordion-trigger">
					<div class="settings-item-text-wrapper">
						<p class="settings-item-title">Prompt Settings</p>
						<p class="settings-item-description">Change your chat bots behaviour.</p>
					</div>
					<div class="accordion-caret">
						<CaretRightIcon />
					</div>
				</label>
				<div class="accordion-content">
					<textarea
						class="accordion-textarea"
						placeholder={defaultPrompt}
						bind:value={$prompt}
						rows="4"
					></textarea>
				</div>
			</div>

			<h3 class="settings-section-title">Account</h3>
			<button
				class="settings-item-container settings-logout-action"
				onclick={() => serviceLogout()}
			>
				<div class="settings-item-text-wrapper">
					<p class="settings-item-title">Logout</p>
				</div>
				<CaretRightIcon />
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
		@apply flex min-h-[72px] items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-2;
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
	.settings-item-description {
		@apply line-clamp-2 text-sm font-normal leading-normal text-[#49739c];
	}

	.settings-accordion-container {
		@apply flex flex-col overflow-hidden rounded-lg bg-slate-50;
	}
	.accordion-toggle {
		@apply absolute h-0 w-0 opacity-0;
	}
	.settings-accordion-trigger {
		@apply flex min-h-[72px] cursor-pointer items-center justify-between gap-4 px-4 py-2 text-left hover:bg-slate-100;
	}
	.accordion-caret {
		@apply transition-transform duration-200 ease-in-out;
	}
	.accordion-content {
		@apply grid grid-rows-[0fr] transition-all duration-200 ease-in-out;
		visibility: hidden;
	}
	.accordion-content > * {
		@apply overflow-hidden;
	}
	.accordion-toggle:checked ~ .accordion-content {
		@apply grid-rows-[1fr] px-4 pb-4 pt-2;
		visibility: visible;
	}
	.accordion-toggle:checked ~ .settings-accordion-trigger .accordion-caret {
		@apply rotate-90;
	}
	.accordion-textarea {
		@apply w-full resize-none rounded-md border border-slate-300 bg-white text-sm focus:border-blue-500 focus:ring-blue-500;
	}
	.accordion-toggle:checked ~ .accordion-content .accordion-textarea {
		@apply p-2;
	}
</style>
