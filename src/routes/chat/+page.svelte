<script lang="ts">
	import { Header, ActionButton, MessageRow, ChatInput } from '$lib/components';
	import { GearIcon, AvatarIcon } from '$lib/components/icons';
    let { data } = $props();
    async function submitCallback(prompt: string){
        data = { ...data, messages: [...data.messages, { role: 'user', content: prompt }] };
        const response = await fetch('https://openai-backend-90260082910.australia-southeast1.run.app/chat',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ prompt })
            }
        );
        if (!response.ok) {
            // Attempt to parse error response as JSON, otherwise use status text
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: response.statusText };
            }
            console.error('Error sending message:', response.status, errorData);
            // You might want to display an error to the user here
            return;
        }
        data = { ...data, messages: [...data.messages, await response.json()] };
    }
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
	<div class="chat-page-wrapper">
		<div class="chat-content-container">
			<div class="message-scroll-area flex flex-1 flex-col-reverse overflow-y-auto pb-20">
                {#each [...data.messages].reverse() as message (message)}
                    <MessageRow
                        senderName = {message.role==='assistant' ? 'AI Assistant' : 'User'}
                        messageText = {message.content}
                        reversed = {message.role!=='assistant'}
                        avatarImageUrl = {message.role!=='assistant' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgiwF6uXRPCf5OBAzeTpCa1DJkREL3WTYmfXhC10DIHh33IdM7BMfceIjiVBbIKtdlrX3nAUbq_XSvVIiIQ71vT7pKaApHJTqHUhIdyeidGVaMJAAx__axom5Ys6y9BibDl3p1qv1GpjeIX6IRMDiRLPELSrQJc16OFBPYyb4AiWCThJ8OcLVrl2-FY4td7eyal8nZtAu863imPxt4tw5UggR-ReBwezq2FU6r-Ybwrud6CTekB2bkWA1xiNp41isUjoOdtminGrCX' : undefined}
                    />
                {/each}
			</div>
		</div>
	</div>
</div>
<!-- Fixed ChatInput Area -->
<div class="fixed bottom-0 left-0 right-0 z-10 bg-slate-50">
	<div class="mx-auto max-w-[960px]">
		<ChatInput {submitCallback}/>
	</div>
</div>

<style lang="postcss">
	.chat-page-wrapper {
		@apply flex flex-1 justify-center px-40 py-5;
	}
	.chat-content-container {
		@apply flex max-w-[960px] flex-1 flex-col;
	}
	.chat-disclaimer {
		@apply px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#49739c];
	}
</style>
