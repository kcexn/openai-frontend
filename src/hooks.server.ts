export async function handle({ event, resolve }) {
	// const auth0Cookies = event.cookies.getAll().filter((cookie) => {
	// 	return cookie.name.startsWith('auth0.');
	// });
	// auth0Cookies.forEach((cookie) => {
	// 	event.locals.user = cookie.name.split('.')[1];
	// 	event.locals.isAuthenticated = cookie.value === 'true';
	// });
	// if (event.locals.isAuthenticated === undefined) {
	// 	event.locals.isAuthenticated = false;
	// }
	return await resolve(event);
}
