<script lang="ts">
	import { Header, ActionButton } from '$lib/components';
	import { GearIcon, AvatarIcon } from '$lib/components/icons';
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
			<div class="message-row">
				<div
					class="message-avatar"
					style="--avatar-image-url: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuH4SrQgK2Uod_o6wpdj9LJ-fGUA9cEJflqlnc-zInZnlfux3MKTJi9ku5RlFavhJ_D0ud-fj8LJizAHFJEAS1_T_PW141udYP-tRv1c8GuQdrRehp5Qwvbf22dH2lsdxCZvrfM7wSH-JeYpwwLQ8cJP21qsDesUzXJZIL2PncspJJNSjKU4LQMyQCNmtDJVZwSqDwaQ117kA10mSkUIPIfCSdEWxJDvvtZF7Oq2l19AGb7mxbRyw9fPTkojbgUOXbWUsPFq7e32y-');"
				></div>
				<div class="message-content">
					<p class="message-sender">AI Assistant</p>
					<p class="message-bubble">Hello! How can I assist you today?</p>
				</div>
			</div>
			<div class="chat-input-area">
				<label class="chat-input-label">
					<div class="chat-input-wrapper">
						<input
							placeholder="Type your message here..."
							class="chat-input-field"
							form-input
							value=""
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
							</div>
						</div>
					</div>
				</label>
			</div>
			<p class="chat-disclaimer">
				ChatterBox can make mistakes. Consider checking important information.
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.chat-page-wrapper {
		@apply flex flex-1 justify-center px-40 py-5;
	}
	.chat-content-container {
		@apply flex max-w-[960px] flex-1 flex-col;
	}
	.message-row {
		@apply flex items-end gap-3 p-4;
	}
	.message-avatar {
		@apply aspect-square w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat;
		background-image: var(--avatar-image-url);
	}
	.message-content {
		@apply flex flex-1 flex-col items-start gap-1;
	}
	.message-sender {
		@apply max-w-[360px] text-[13px] font-normal leading-normal text-[#49739c];
	}
	.message-bubble {
		@apply flex max-w-[360px] rounded-xl bg-[#e7edf4] px-4 py-3 text-base font-normal leading-normal text-[#0d141c];
	}
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
	.chat-disclaimer {
		@apply px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#49739c];
	}
</style>
