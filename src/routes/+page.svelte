<script lang="ts">
	import { Header, FeatureSection } from '$lib/components';
    import { createAuth0Client, type Auth0Client } from '@auth0/auth0-spa-js';

    let { data } = $props();
    let isAuthenticated = $state(false);
    let auth0Client: Auth0Client | undefined = $state(undefined);

    const login = async () => {
        if (!auth0Client) {
            console.error("Auth0 client not initialized. Cannot login.");
            return;
        }
        const redirectUri = window.location.origin.trim();
        console.log(`Attempting login with redirect_uri: ${redirectUri}`);
        try {
            await auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: redirectUri
                }
            });
        } catch (error) {
            console.error("Error initiating loginWithRedirect:", error);
        }
    };

    $effect(() => {
        let isMounted = true;

        async function initializeAuth0() {
            if (auth0Client === undefined && data.auth0Credentials) {
                const client = await createAuth0Client({
                    domain: data.auth0Credentials.domain,
                    clientId: data.auth0Credentials.clientId,
                    authorizationParams: {
                        redirect_uri: window.location.origin
                    }
                });
                if (!isMounted) return;
                auth0Client = client;

                if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
                    await auth0Client.handleRedirectCallback();
                    window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
                }

                if (!isMounted) return;
                isAuthenticated = await auth0Client.isAuthenticated();
            }
        }

        initializeAuth0();

        return () => {
            isMounted = false;
        };
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
				title="Your AI-Powered Chat Companion"
				subtitle="Experience the future of communication with our intelligent chatbot. Get instant answers, personalized assistance, and engaging conversations."
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
