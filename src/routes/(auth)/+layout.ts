import { auth0Guard } from '$lib/services/auth0.service';
export const ssr = false;
export const prerender = false;

export async function load({ url }) {
	await auth0Guard({
		requiresAuth: true,
		redirectTo: url.pathname
	});
}
