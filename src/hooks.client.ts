import { initAuth0 } from '$lib/services/auth0.service';

export async function init() {
	await initAuth0();
}
