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
	<div class="flex flex-1 justify-center px-40 py-5">
		<div
			class="layout-content-container flex w-[512px] max-w-[512px] max-w-[960px] flex-1 flex-col py-5"
		>
			<div class="flex flex-wrap justify-between gap-3 p-4">
				<p class="tracking-light min-w-72 text-[32px] font-bold leading-tight text-[#0d141c]">
					Settings
				</p>
			</div>
			<h3 class="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#0d141c]">
				Chatbot
			</h3>
			<div class="flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2">
				<div class="flex flex-col justify-center">
					<p class="line-clamp-1 text-base font-medium leading-normal text-[#0d141c]">
						Response style
					</p>
					<p class="line-clamp-2 text-sm font-normal leading-normal text-[#49739c]">
						Choose a style for your chatbot's responses
					</p>
				</div>
				<div class="shrink-0">
					<p class="text-base font-normal leading-normal text-[#0d141c]">Creative</p>
				</div>
			</div>
			<div class="flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2">
				<div class="flex flex-col justify-center">
					<p class="line-clamp-1 text-base font-medium leading-normal text-[#0d141c]">
						Feature settings
					</p>
					<p class="line-clamp-2 text-sm font-normal leading-normal text-[#49739c]">
						Enable or disable specific chatbot features
					</p>
				</div>
				<div class="shrink-0">
					<div
						class="flex size-7 items-center justify-center text-[#0d141c]"
						data-icon="CaretRight"
						data-size="24px"
						data-weight="regular"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24px"
							height="24px"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
							></path>
						</svg>
					</div>
				</div>
			</div>
			<h3 class="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#0d141c]">
				Account
			</h3>
			<div class="flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2">
				<div class="flex flex-col justify-center">
					<p class="line-clamp-1 text-base font-medium leading-normal text-[#0d141c]">
						Account information
					</p>
					<p class="line-clamp-2 text-sm font-normal leading-normal text-[#49739c]">
						Manage your account details and preferences
					</p>
				</div>
				<div class="shrink-0">
					<div
						class="flex size-7 items-center justify-center text-[#0d141c]"
						data-icon="CaretRight"
						data-size="24px"
						data-weight="regular"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24px"
							height="24px"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
							></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2">
				<div class="flex flex-col justify-center">
					<p class="line-clamp-1 text-base font-medium leading-normal text-[#0d141c]">
						Subscription
					</p>
					<p class="line-clamp-2 text-sm font-normal leading-normal text-[#49739c]">
						View and manage your subscription plan
					</p>
				</div>
				<div class="shrink-0">
					<div
						class="flex size-7 items-center justify-center text-[#0d141c]"
						data-icon="CaretRight"
						data-size="24px"
						data-weight="regular"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24px"
							height="24px"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
							></path>
						</svg>
					</div>
				</div>
			</div>
			<h3 class="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#0d141c]">
				Help &amp; Support
			</h3>
			<div class="flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2">
				<div class="flex flex-col justify-center">
					<p class="line-clamp-1 text-base font-medium leading-normal text-[#0d141c]">
						Help center
					</p>
					<p class="line-clamp-2 text-sm font-normal leading-normal text-[#49739c]">
						Access help resources and FAQs
					</p>
				</div>
				<div class="shrink-0">
					<div
						class="flex size-7 items-center justify-center text-[#0d141c]"
						data-icon="CaretRight"
						data-size="24px"
						data-weight="regular"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24px"
							height="24px"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
							></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="flex min-h-[72px] items-center justify-between gap-4 bg-slate-50 px-4 py-2">
				<div class="flex flex-col justify-center">
					<p class="line-clamp-1 text-base font-medium leading-normal text-[#0d141c]">
						Contact support
					</p>
					<p class="line-clamp-2 text-sm font-normal leading-normal text-[#49739c]">
						Contact support for assistance
					</p>
				</div>
				<div class="shrink-0">
					<div
						class="flex size-7 items-center justify-center text-[#0d141c]"
						data-icon="CaretRight"
						data-size="24px"
						data-weight="regular"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24px"
							height="24px"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
							></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
