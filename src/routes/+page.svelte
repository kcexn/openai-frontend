<script lang="ts">
	import { Header, FeatureSection } from '$lib/components';
    import { authStore, login as serviceLogin } from '$lib/services/auth0.service';

    let isAuthenticated = $derived($authStore.isAuthenticated);
    let isLoading = $derived($authStore.isLoading);
</script>

<div class="page-container">
	<Header>
		{#snippet actions()}
            {#if isLoading}
                <button class="btn-primary-action" disabled>
                    <span class="truncate">Loading...</span>
                </button>
            {:else if isAuthenticated}
                <a href="/chat" class="btn-primary-action">
                    <span class="truncate">Start Chatting</span>
                </a>
            {:else}
                <button class="btn-primary-action" onclick={() => serviceLogin({ appState: { targetUrl: '/chat' } })}>
                    <span class="truncate">Login to Start Chatting</span>
                </button>
            {/if}
		{/snippet}
	</Header>
	<div class="page-content-wrapper">
		<div class="page-content-container">
			<FeatureSection
				imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCvhSV7Cq0cigCvdvtodd0NDi8VOs6PXdVOzPASEfwIQUGHSINPwjMh23oFfPhOdvAZfrnsh2SEHRbxMuRymWwSd2TsLp2_z6GV0I0ysJFtxESDE3R5FwK60f7zDpEVr8oC8aDN8_Z10I9iR7O_eTeTaY1hvyRKDVT-wOXu5MflauFa7dTlHZc7Ncjs_k4_QdWjd2bC6SfPii7-sGso26tV7gL96WCcEuVRedo3tjaSgkKVpx27sZI2DHGT4MSjB0aNL7oraOIkPDuH"
				title="Your AI-Powered Chat Companion"
				subtitle="Experience the future of communication with our intelligent chatbot. Get instant answers, personalized assistance, and engaging conversations."
				buttonText="Start Chatting"
				buttonHref="/chat"
                {isLoading}
                {isAuthenticated}
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
