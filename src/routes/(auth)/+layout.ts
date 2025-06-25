import { redirect } from '@sveltejs/kit';
import { auth0Guard } from '$lib/services/auth0.service';
export const ssr = false;
export const prerender = false;

export async function load({ url }) {
	if (url.protocol === 'http:' && url.hostname !== 'sveltekit-prerender' && import.meta.env.PROD) {
		url.protocol = 'https:';
		return redirect(308, url);
	}
	await auth0Guard({
		redirectTo: url.pathname
	});
}
