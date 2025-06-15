<script lang="ts">
    import { tick } from 'svelte';
    import { goto } from '$app/navigation';
	import { Header, ActionButton, MessageRow, ChatInput } from '$lib/components';
	import { GearIcon, AvatarIcon } from '$lib/components/icons';
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
    import { getAccessToken } from '$lib/services/auth0.service';

    let { data } = $props();
    async function sendMessage(prompt: string) {
        const token = await getAccessToken();
        if (token) {
            return await fetch(`${PUBLIC_BACKEND_HOST}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ prompt })
            });
        } else {
            await goto('/');
            return undefined;
        }
    }
    async function submitCallback(prompt: string) {
        data = { ...data, messages: [...data.messages, { role: 'user', content: prompt }] };
        await tick();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
        const response = await sendMessage(prompt);
        if (response) {
            if(!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { message: response.statusText };
                }
                console.error('Error sending message:', response.status, errorData);
                return;
            }
            data = { ...data, messages: [...data.messages, await response.json()] };
            await tick();
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
        }
    }

    async function clearChatHistory() {
        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        data = { ...data, messages: [] };
        await tick();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
    }

    let messageScrollAreaEl: HTMLDivElement;
    let fixedFooterEl: HTMLDivElement;
    $effect(() => {
        if (fixedFooterEl && messageScrollAreaEl) {
            const footerHeight = fixedFooterEl.offsetHeight;
            messageScrollAreaEl.style.paddingBottom = `${footerHeight}px`;
        }
    });
</script>

<div class="fixed-header-outer">
	<div class="fixed-header-inner">
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
	</div>
</div>
<div class="page-layout-container">
	<div class="chat-page-wrapper">
		<div class="chat-content-container">
			<div class="message-scroll-area" bind:this={messageScrollAreaEl}>
                {#each data.messages as {role, content}}
                    <MessageRow
                        senderName = {role==='assistant' ? 'AI Assistant' : 'User'}
                        messageText = {content}
                        reversed = {role!=='assistant'}
                        avatarImageUrl = {role!=='assistant' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgiwF6uXRPCf5OBAzeTpCa1DJkREL3WTYmfXhC10DIHh33IdM7BMfceIjiVBbIKtdlrX3nAUbq_XSvVIiIQ71vT7pKaApHJTqHUhIdyeidGVaMJAAx__axom5Ys6y9BibDl3p1qv1GpjeIX6IRMDiRLPELSrQJc16OFBPYyb4AiWCThJ8OcLVrl2-FY4td7eyal8nZtAu863imPxt4tw5UggR-ReBwezq2FU6r-Ybwrud6CTekB2bkWA1xiNp41isUjoOdtminGrCX' : undefined}
                    />
                {/each}
			</div>
		</div>
	</div>
</div>
<div class="fixed-footer-outer" bind:this={fixedFooterEl}>
	<div class="fixed-footer-inner">
		<ChatInput {submitCallback}/>
        <div class="clear-chat-button-wrapper">
            <button class="clear-chat-button" onclick={clearChatHistory}>
                <span class="truncate">Clear Chat History</span>
            </button>
        </div>
	</div>
</div>

<style lang="postcss">
	.chat-page-wrapper {
		@apply flex flex-1 justify-center overflow-y-hidden px-40 py-5;
	}
	.chat-content-container {
		@apply flex max-w-[960px] flex-1 flex-col overflow-y-hidden;
	}
	.fixed-header-outer {
		@apply fixed top-0 left-0 right-0 z-20 border-b border-slate-200 bg-slate-50;
	}
	.fixed-header-inner {
		@apply mx-auto max-w-[960px];
	}
	.message-scroll-area {
		@apply flex flex-col mt-auto;
	}
	.page-layout-container {
		@apply flex h-full grow flex-col pt-16;
	}
	.fixed-footer-outer {
		@apply fixed bottom-0 left-0 right-0 z-10 bg-slate-50;
	}
	.fixed-footer-inner {
		@apply mx-auto max-w-[960px];
	}
	.clear-chat-button-wrapper {
		@apply flex px-4 py-3 justify-end;
	}
	.clear-chat-button {
		@apply flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#eaedf1] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em];
	}
</style>
