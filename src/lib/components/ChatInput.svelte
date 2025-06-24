<script lang="ts">
	let { value = '', submitCallback } = $props();

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const currentMessage = value.trim();
		if (!currentMessage) return;
		submitCallback(currentMessage);
		value = '';
	}
</script>

<form class="chat-input-area" onsubmit={handleSubmit}>
	<label class="chat-input-label">
		<div class="chat-input-wrapper">
			<input
				placeholder="Type your message here..."
				class="chat-input-field"
				name="prompt"
				autocomplete="off"
				bind:value
			/>
			<div class="chat-input-actions">
				<div class="chat-input-actions-inner">
					<button type="submit" class="send-button">Send</button>
				</div>
			</div>
		</div>
	</label>
</form>

<style lang="postcss">
	.chat-input-area {
		@apply flex items-center gap-3 px-4 py-3;
	}
	.chat-input-label {
		@apply flex h-12 min-w-40 flex-1 flex-col;
	}
	.chat-input-wrapper {
		@apply flex h-full w-full flex-1 items-stretch rounded-xl focus-within:ring-2 focus-within:ring-blue-500;
	}
	.chat-input-field {
		@apply flex h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl rounded-r-none border-r-0 border-none bg-[#e7edf4] px-4 text-base font-normal leading-normal text-[#0d141c] placeholder:text-[#49739c] focus:border-none focus:outline-none focus:ring-0;
	}
	.chat-input-actions {
		@apply flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#e7edf4] !pr-2;
	}
	.chat-input-actions-inner {
		@apply flex items-center justify-end;
	}
	.send-button {
		@apply rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500;
	}
</style>
