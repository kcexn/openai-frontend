<script lang="ts">
	let { value = '', submitCallback } = $props();

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const currentMessage = value.trim();
        if (!currentMessage) {
            // Optionally, provide user feedback for empty input
            return;
        }
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
					<div class="chat-input-icon-group">
						<button class="chat-input-icon-button">
							<div
								class="chat-input-icon"
								data-icon="Image"
								data-size="20px"
								data-weight="regular"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20px"
									height="20px"
									fill="currentColor"
									viewBox="0 0 256 256"
								>
									<path
										d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"
									></path>
								</svg>
							</div>
						</button>
					</div>
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
		@apply flex h-full w-full flex-1 items-stretch rounded-xl;
	}
	.chat-input-field {
		@apply flex h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl rounded-r-none border-r-0 border-none bg-[#e7edf4] px-4 pr-2 text-base font-normal leading-normal text-[#0d141c] placeholder:text-[#49739c] focus:border-none focus:outline-0 focus:ring-0;
	}
	.chat-input-actions {
		@apply flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#e7edf4] !pr-2 pr-4;
	}
	.chat-input-actions-inner {
		@apply flex items-center justify-end gap-4;
	}
	.chat-input-icon-group {
		@apply flex items-center gap-1;
	}
	.chat-input-icon-button {
		@apply flex items-center justify-center p-1.5;
	}
	.chat-input-icon {
		@apply text-[#49739c];
	}
	.send-button {
		@apply rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500;
		/* Ensure it aligns nicely if chat-input-actions-inner is flex */
	}
</style>