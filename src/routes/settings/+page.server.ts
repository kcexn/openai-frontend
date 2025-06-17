import { redirect } from '@sveltejs/kit'
export async function load(event) {
    const user = event.locals.user;
    const isAuthenticated = event.locals.isAuthenticated;
    if(user === undefined || !isAuthenticated) {
        redirect(307, '/');
    }
	return null;
}
