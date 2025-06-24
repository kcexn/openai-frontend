import { auth0Guard } from '$lib/services/auth0.service';
export const ssr = false;

export async function load({ parent, url }) {
	await parent();
	await auth0Guard({
		requiresAuth: true,
		redirectTo: url.pathname
	});
}
