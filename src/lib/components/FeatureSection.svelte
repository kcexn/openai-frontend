<script lang="ts">
	let { imageUrl, title, subtitle, buttonText = 'Learn More', buttonHref } = $props();
</script>

<div class="feature-section-container">
	<div class="feature-section-image" style="background-image: url('{imageUrl}');"></div>
	<div data-sveltekit-preload-data="false" class="feature-section-content">
		<div class="feature-section-text">
			<h1 class="feature-section-title">
				{title}
			</h1>
			<h2 class="feature-section-subtitle">
				{subtitle}
			</h2>
		</div>
		{#if buttonHref}
			<a href={buttonHref} class="feature-section-button">
				<span class="truncate">{buttonText}</span>
			</a>
		{:else}
			<button class="feature-section-button">
				<span class="truncate">{buttonText}</span>
			</button>
		{/if}
	</div>
</div>

<style lang="postcss">
	.feature-section-container {
		@apply flex flex-col gap-8 px-4 py-10 lg:flex-row;
	}
	.feature-section-image {
		@apply aspect-video w-full rounded-xl bg-cover bg-center bg-no-repeat lg:w-[400px] lg:flex-shrink-0 xl:w-[480px];
	}
	.feature-section-content {
		@apply flex w-full flex-col justify-center gap-8 lg:min-w-[400px] lg:flex-1;
	}
	.feature-section-text {
		@apply flex flex-col gap-2 text-left;
	}
	.feature-section-title {
		@apply text-3xl font-black leading-tight tracking-[-0.033em] text-[#0d151c] sm:text-4xl lg:text-5xl;
	}
	.feature-section-subtitle {
		@apply text-base font-normal leading-normal text-[#0d151c];
	}
	.feature-section-button {
		@apply flex h-12 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center self-center overflow-hidden rounded-full bg-[#0b80ee] px-5 text-base font-bold leading-normal tracking-[-0.015em] text-slate-50 sm:w-auto;
	}
</style>
