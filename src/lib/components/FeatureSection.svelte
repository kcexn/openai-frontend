<script lang="ts">
	let { imageUrl, title, subtitle, buttonText = 'Learn More', buttonHref, isLoading = false, isAuthenticated = false } = $props();
	import { login as serviceLogin } from '$lib/services/auth0.service';
</script>

<div class="feature-section-container">
	<div class="feature-section-image" style="background-image: url('{imageUrl}');"></div>
	<div class="feature-section-content">
		<div class="feature-section-text">
			<h1 class="feature-section-title">
				{title}
			</h1>
			<h2 class="feature-section-subtitle">
				{subtitle}
			</h2>
		</div>
		{#if isLoading}
			<button class="feature-section-button" disabled>
				<span class="truncate">Loading...</span>
			</button>
		{:else if isAuthenticated}
			{#if buttonHref}
				<a href={buttonHref} class="feature-section-button">
					<span class="truncate">{buttonText}</span>
				</a>
			{:else}
				<button class="feature-section-button">
					<span class="truncate">{buttonText}</span>
				</button>
			{/if}
		{:else}
			<button class="feature-section-button" onclick={() => serviceLogin({ appState: { targetUrl: buttonHref || '/' } })}>
				<span class="truncate">Login to {buttonText.toLowerCase()}</span>
			</button>
		{/if}
	</div>
</div>

<style lang="postcss">
	.feature-section-container {
		@apply flex flex-row gap-8 px-4 py-10;
	}
	.feature-section-image {
		@apply aspect-video h-auto w-full min-w-[400px] rounded-xl bg-cover bg-center bg-no-repeat;
	}
	.feature-section-content {
		@apply flex min-w-[400px] flex-col justify-center gap-8;
	}
	.feature-section-text {
		@apply flex flex-col gap-2 text-left;
	}
	.feature-section-title {
		@apply text-5xl font-black leading-tight tracking-[-0.033em] text-[#0d151c];
	}
	.feature-section-subtitle {
		@apply text-base font-normal leading-normal text-[#0d151c];
	}
	.feature-section-button {
		@apply flex h-12 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#0b80ee] px-5 text-base font-bold leading-normal tracking-[-0.015em] text-slate-50;
	}
</style>
