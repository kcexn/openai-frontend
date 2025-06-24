import { PUBLIC_AUTH_DOMAIN, PUBLIC_CLIENT_ID, PUBLIC_BACKEND_HOST } from '$env/static/public';
import { goto } from '$app/navigation';
import { writable, get, type Writable } from 'svelte/store';
import {
	createAuth0Client,
	type Auth0Client,
	type User,
	type LogoutOptions,
	type RedirectLoginOptions,
	type GetTokenSilentlyOptions
} from '@auth0/auth0-spa-js';

export interface AuthState {
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
	error: null
};

export const authStore: Writable<AuthState> = writable(initialState);

let clientInstance: Auth0Client | undefined;
export async function initializeAuth0Client() {
	if (clientInstance) return;
	authStore.update((store) => ({ ...store, isLoading: true, error: null }));
	try {
		clientInstance = await createAuth0Client({
			domain: PUBLIC_AUTH_DOMAIN,
			clientId: PUBLIC_CLIENT_ID,
			authorizationParams: {
				audience: PUBLIC_BACKEND_HOST,
				redirect_uri: window.location.origin
			},
			cacheLocation: 'localstorage',
			useRefreshTokens: true
		});
		if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
			const { appState } = await clientInstance.handleRedirectCallback();
			goto(appState?.targetUrl || '');
		}
		const isAuthenticated = await clientInstance.isAuthenticated();
		const user = isAuthenticated ? await clientInstance.getUser() : undefined;
		authStore.update((store) => ({
			...store,
			auth0Client: clientInstance,
			isAuthenticated,
			user,
			isLoading: false
		}));
	} catch (e) {
		const error = e instanceof Error ? e : new Error(String(e));
		authStore.update((store) => ({ ...store, error, isLoading: false }));
		console.error('Error initializing Auth0 client:', error);
	}
}

export async function login(options?: RedirectLoginOptions) {
	if (!clientInstance) {
		console.error('Auth0 client not initialized. Call initializeAuth0Client first.');
		return;
	}
	clientInstance.loginWithRedirect(options);
}

export async function logout(options?: LogoutOptions) {
	if (!clientInstance) return;
	clientInstance.logout(options || { logoutParams: { returnTo: window.location.origin } });
}

export async function getAccessToken(
	options?: GetTokenSilentlyOptions
): Promise<string | undefined> {
	if (!clientInstance) {
		console.error('Auth0 client not initialized. Call initializeAuth0Client first.');
		return;
	}
	try {
		return clientInstance.getTokenSilently(options);
	} catch (error) {
		console.error('Error getting access token:', error);
		return;
	}
}

export function waitForAuth(
	callBack: () => Promise<void>,
	options: {
		requiresAuth: boolean;
		redirectTo?: string;
	} = { requiresAuth: true }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): (...args: any[]) => any {
	const abortController = new AbortController();
	(async () => {
		while (get(authStore).isLoading && !abortController.signal.aborted) {
			await new Promise((resolve) => {
				const timeoutId = setTimeout(resolve, 50);
				abortController.signal.addEventListener('abort', () => clearTimeout(timeoutId));
			});
		}
		if (abortController.signal.aborted) return;
		if (options.requiresAuth && !get(authStore).isAuthenticated) {
			const path =
				(options.redirectTo || '/') +
				'?error=unauthorized&redirect=' +
				encodeURIComponent(window.location.pathname);
			return await goto(path, { replaceState: true });
		}
		return await callBack();
	})();

	return () => {
		return abortController.abort();
	};
}
