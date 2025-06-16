<script lang="ts">
	let {
		avatarImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuH4SrQgK2Uod_o6wpdj9LJ-fGUA9cEJflqlnc-zInZnlfux3MKTJi9ku5RlFavhJ_D0ud-fj8LJizAHFJEAS1_T_PW141udYP-tRv1c8GuQdrRehp5Qwvbf22dH2lsdxCZvrfM7wSH-JeYpwwLQ8cJP21qsDesUzXJZIL2PncspJJNSjKU4LQMyQCNmtDJVZwSqDwaQ117kA10mSkUIPIfCSdEWxJDvvtZF7Oq2l19AGb7mxbRyw9fPTkojbgUOXbWUsPFq7e32y-',
		senderName = 'AI Assistant',
		messageText = 'Hello! How can I assist you today?',
		reversed = false
	} = $props();
</script>

<div class="message-row" class:flex-row-reverse={!reversed}>
	<div class="message-avatar" style="--avatar-image-url: url({avatarImageUrl});"></div>
	<div class="message-content" class:items-start={reversed} class:items-end={!reversed}>
		<p class="message-sender">{senderName}</p>
		<p class="message-bubble">{messageText}</p>
	</div>
</div>

<style lang="postcss">
	.message-row {
		@apply flex items-end gap-3 p-4;
	}
	.message-avatar {
		@apply aspect-square w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat;
		background-image: var(--avatar-image-url);
	}
	.message-content {
		@apply flex flex-1 flex-col gap-1;
	}
	.message-sender {
		@apply max-w-full text-[13px] font-normal leading-normal text-[#49739c] sm:max-w-[360px];
	}
	.message-bubble {
		@apply flex max-w-full rounded-xl bg-[#e7edf4] px-4 py-3 text-base font-normal leading-normal text-[#0d141c] sm:max-w-[360px];
	}
</style>
