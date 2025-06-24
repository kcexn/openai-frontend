import { login } from '$lib/services/auth0.service';
import { goto } from '$app/navigation';
export const ssr = false;

export async function load({ parent, url }) {
	await parent();
	const targetUrl = url.searchParams.get('redirect');
	if (targetUrl) {
		login({ appState: { targetUrl } });
	} else {
		goto('/', { replaceState: true });
	}
}
