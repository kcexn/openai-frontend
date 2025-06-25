import { goto } from '$app/navigation';
import { login } from '$lib/services/auth0.service';
export const ssr = false;
export const prerender = false;

export async function load({ url }) {
	const targetUrl = url.searchParams.get('redirect');
	if (targetUrl) {
		login({ appState: { targetUrl } });
	} else {
		goto('/', { replaceState: true });
	}
}
