import { auth0Credentials } from "$lib/data/auth0";
import { writable, type Writable } from 'svelte/store';
import { 
    createAuth0Client,
    type Auth0Client,
    type User,
    type LogoutOptions,
    type RedirectLoginOptions
} from '@auth0/auth0-spa-js';

interface AuthState {
	auth0Client: Auth0Client | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | undefined;
	error: Error | null;
}

const initialState: AuthState = {
	auth0Client: undefined,
	isAuthenticated: false,
	isLoading: true,
	user: undefined,
	error: null,
};

export const authStore: Writable<AuthState> = writable(initialState);

let clientInstance: Auth0Client | undefined;
export async function initializeAuth0Client() {
	if (clientInstance)
		return;
	authStore.update(store => ({ ...store, isLoading: true, error: null }));
	try {
		clientInstance = await createAuth0Client({
			domain: auth0Credentials.domain,
			clientId: auth0Credentials.clientId,
			authorizationParams: {
				redirect_uri: window.location.origin,
			},
		});

		if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
			const { appState } = await clientInstance.handleRedirectCallback();
			window.history.replaceState({}, document.title, appState?.targetUrl || window.location.pathname);
		}

		const isAuthenticated = await clientInstance.isAuthenticated();
		const user = isAuthenticated ? await clientInstance.getUser() : undefined;

		authStore.update(store => ({
			...store,
			auth0Client: clientInstance,
			isAuthenticated,
			user,
			isLoading: false,
		}));
	} catch (e) {
		const error = e instanceof Error ? e : new Error(String(e));
		authStore.update(store => ({ ...store, error, isLoading: false }));
		console.error("Error initializing Auth0 client:", error);
	}
}

export async function login(options?: RedirectLoginOptions) {
	if (!clientInstance) {
		console.error("Auth0 client not initialized. Call initializeAuth0Client first.");
		return;
	}
	await clientInstance.loginWithRedirect(options);
}

export async function logout(options?: LogoutOptions) {
	if (!clientInstance) return;
	await clientInstance.logout(options || { logoutParams: { returnTo: window.location.origin } });
}
