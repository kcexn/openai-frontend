<script lang="ts">
	import { tick, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Header, ActionButton, MessageRow, ChatInput } from '$lib/components';
	import { GearIcon, AvatarIcon } from '$lib/components/icons';
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import { waitForAuth, getAccessToken } from '$lib/services/auth0.service';

	let { data }: { data: { messages: { id: string; role: string; content: string }[] } } = $props();
	async function getMessages() {
		const token = await getAccessToken();
		if (token) {
			const response = await fetch(`${PUBLIC_BACKEND_HOST}/chat`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				credentials: 'include'
			});
			if (!response.ok) {
				let errorData;
				try {
					errorData = await response.json();
				} catch {
					errorData = { message: response.statusText };
				}
				console.error('Error getting messages:', response.status, errorData);
				return;
			}
			const aiResponse = await response.json();
			const messages = aiResponse.map((msg: { role: string; content: string }) => {
				return { id: crypto.randomUUID(), ...msg };
			});
			data = { ...data, messages };
			await tick();
			window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
		} else {
			goto('/', { replaceState: true });
		}
	}
	async function sendMessage(prompt: string) {
		const token = await getAccessToken();
		if (token) {
			return await fetch(`${PUBLIC_BACKEND_HOST}/chat`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				credentials: 'include',
				body: JSON.stringify({ prompt })
			});
		} else {
			goto('/', { replaceState: true });
		}
	}
	async function submitCallback(prompt: string) {
		const messages = [
			...data.messages,
			{ id: crypto.randomUUID(), role: 'user', content: prompt },
			{ id: crypto.randomUUID(), role: 'assistant', content: '...' }
		];
		data = { ...data, messages };
		await tick();
		window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
		messages.pop();
		const response = await sendMessage(prompt);
		if (response) {
			if (!response.ok) {
				let errorData;
				try {
					errorData = await response.json();
				} catch {
					errorData = { message: response.statusText };
				}
				messages.push({
					id: crypto.randomUUID(),
					role: 'assistant',
					content: `Error: ${errorData.message}`
				});
				data = { ...data, messages };
				console.error('Error sending message:', response.status, errorData);
			}
			const aiResponse = await response.json();
			messages.push({ id: crypto.randomUUID(), ...aiResponse });
			data = { ...data, messages };
			await tick();
			window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
		}
	}
	async function newChat() {
		const token = await getAccessToken();
		if (token) {
			const response = await fetch(`${PUBLIC_BACKEND_HOST}/chat`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				},
				credentials: 'include'
			});
			if (!response.ok) {
				let errorData;
				try {
					errorData = await response.json();
				} catch {
					errorData = { message: response.statusText };
				}
				console.error('Error delete session:', response.status, errorData);
				return;
			}
		} else {
			goto('/', { replaceState: true });
			return;
		}
		data = { ...data, messages: [] };
		await tick();
		window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
	}

	let messageScrollAreaEl: HTMLDivElement;
	let fixedFooterEl: HTMLDivElement;
	onMount(() => {
		return waitForAuth(async () => {
			getMessages();
			if (fixedFooterEl && messageScrollAreaEl) {
				const footerHeight = fixedFooterEl.offsetHeight;
				messageScrollAreaEl.style.paddingBottom = `${footerHeight}px`;
			}
		});
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
				{#each data.messages as { id, role, content } (id)}
					<MessageRow
						senderName={role === 'assistant' ? 'AI Assistant' : 'User'}
						messageText={content}
						reversed={role !== 'assistant'}
						avatarImageUrl={role !== 'assistant'
							? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgiwF6uXRPCf5OBAzeTpCa1DJkREL3WTYmfXhC10DIHh33IdM7BMfceIjiVBbIKtdlrX3nAUbq_XSvVIiIQ71vT7pKaApHJTqHUhIdyeidGVaMJAAx__axom5Ys6y9BibDl3p1qv1GpjeIX6IRMDiRLPELSrQJc16OFBPYyb4AiWCThJ8OcLVrl2-FY4td7eyal8nZtAu863imPxt4tw5UggR-ReBwezq2FU6r-Ybwrud6CTekB2bkWA1xiNp41isUjoOdtminGrCX'
							: undefined}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
<div class="fixed-footer-outer" bind:this={fixedFooterEl}>
	<div class="fixed-footer-inner">
		<ChatInput {submitCallback} />
		<div class="new-chat-button-container">
			<button class="btn-new-chat" onclick={newChat}>
				<span class="truncate">New Chat</span>
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.chat-page-wrapper {
		@apply flex flex-1 justify-center overflow-y-hidden px-4 py-5 sm:px-8 md:px-20 lg:px-40;
	}
	.chat-content-container {
		@apply flex max-w-[960px] flex-1 flex-col overflow-y-hidden;
	}
	.fixed-header-outer {
		@apply fixed left-0 right-0 top-0 z-20 border-b border-slate-200 bg-slate-50;
	}
	.fixed-header-inner {
		@apply mx-auto max-w-[960px];
	}
	.message-scroll-area {
		@apply mt-auto flex flex-col;
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
	.new-chat-button-container {
		@apply flex justify-end px-2 py-2 sm:px-4 sm:py-3;
	}
	.btn-new-chat {
		@apply flex h-8 min-w-[70px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#eaedf1] px-3 text-xs font-bold leading-normal tracking-[0.015em] text-[#101518] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50 sm:h-10 sm:min-w-[84px] sm:px-4 sm:text-sm;
	}
</style>
