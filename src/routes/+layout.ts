import { browser } from '$app/environment';
import { getAuth0Client } from '$lib/services/auth0.service';

export async function load() {
	if (browser) {
		await getAuth0Client();
	}
}
