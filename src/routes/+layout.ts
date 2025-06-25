import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	if (url.protocol === 'http:' && url.hostname !== 'sveltekit-prerender' && import.meta.env.PROD) {
		url.protocol = 'https:';
		return redirect(308, url);
	}
}
