<script lang="ts">
	import { Header, FeatureSection } from '$lib/components';
</script>

<div class="page-container">
	<Header title="Chat">
		{#snippet actions()}
			<div data-sveltekit-preload-data="false">
				<a href="/chat" class="btn-primary-action">
					<span class="truncate">Start Chatting</span>
				</a>
			</div>
		{/snippet}
	</Header>
	<div class="page-content-wrapper">
		<div data-sveltekit-preload-data="false" class="page-content-container">
			<FeatureSection
				imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCvhSV7Cq0cigCvdvtodd0NDi8VOs6PXdVOzPASEfwIQUGHSINPwjMh23oFfPhOdvAZfrnsh2SEHRbxMuRymWwSd2TsLp2_z6GV0I0ysJFtxESDE3R5FwK60f7zDpEVr8oC8aDN8_Z10I9iR7O_eTeTaY1hvyRKDVT-wOXu5MflauFa7dTlHZc7Ncjs_k4_QdWjd2bC6SfPii7-sGso26tV7gL96WCcEuVRedo3tjaSgkKVpx27sZI2DHGT4MSjB0aNL7oraOIkPDuH"
				title="Your AI-Powered Assistant"
				subtitle="Experience the future with our intelligent assistant. Get instant answers and personalized assistance."
				buttonText="Start Chatting"
				buttonHref="/chat"
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	.page-content-wrapper {
		@apply flex flex-1 justify-center px-40 py-5;
	}
	.page-content-container {
		@apply flex max-w-[960px] flex-1 flex-col; /* Assuming 'layout-content-container' was a placeholder for these utilities */
	}
	.btn-primary-action {
		@apply flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#0c7ff2] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-slate-50;
	}
</style>
