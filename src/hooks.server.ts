import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const { url } = event;
	if (url.protocol === 'http:' && url.hostname !== 'sveltekit-prerender' && import.meta.env.PROD) {
		url.protocol = 'https:';
		return redirect(308, url);
	}
	return await resolve(event);
}
