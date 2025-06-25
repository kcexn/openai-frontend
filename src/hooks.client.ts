import { redirect } from '@sveltejs/kit';
import { initAuth0 } from '$lib/services/auth0.service';

export async function init() {
	if (
		window.location.protocol === 'http:' &&
		window.location.hostname !== 'sveltekit-prerender' &&
		import.meta.env.PROD
	) {
		window.location.protocol = 'https:';
		redirect(308, window.location.href);
	}
	await initAuth0();
}
