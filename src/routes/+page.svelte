<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { Header, FeatureSection } from '$lib/components';
	import { authStore, login as serviceLogin } from '$lib/services/auth0.service';

	onNavigate(() => {
		const abortController = new AbortController();

		const waitForAuth = async () => {
			while (!$authStore.auth0Client && !abortController.signal.aborted) {
				await new Promise((resolve) => {
					const timeoutId = setTimeout(resolve, 50);
					abortController.signal.addEventListener('abort', () => clearTimeout(timeoutId));
				});
			}

			if (abortController.signal.aborted) return;

			const urlParams = new URLSearchParams(window.location.search);
			const error = urlParams.get('error');
			const redirect = urlParams.get('redirect');

			if (error === 'unauthorized') {
				const targetUrl = redirect ? decodeURIComponent(redirect) : '/';
				await serviceLogin({ appState: { targetUrl } });
			}
		};

		waitForAuth();

		return () => abortController.abort();
	});
</script>

<div class="page-container">
	<Header>
		{#snippet actions()}
			<a href="/chat" class="btn-primary-action">
				<span class="truncate">Start Chatting</span>
			</a>
		{/snippet}
	</Header>
	<div class="page-content-wrapper">
		<div class="page-content-container">
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
