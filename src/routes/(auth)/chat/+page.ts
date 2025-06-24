import { goto } from '$app/navigation';
import { getAccessToken } from '$lib/services/auth0.service';
import { PUBLIC_BACKEND_HOST } from '$env/static/public';

async function getMessages() {
	const token = await getAccessToken();
	if (token) {
		const response = await fetch(`${PUBLIC_BACKEND_HOST}/chat`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			credentials: 'include'
		});
		if (!response.ok) {
			let errorData;
			try {
				errorData = await response.json();
			} catch {
				errorData = { message: response.statusText };
			}
			console.error('Error getting messages:', response.status, errorData);
			return;
		}
		const aiResponse = await response.json();
		return aiResponse.map((msg: { role: string; content: string }) => {
			return { id: crypto.randomUUID(), ...msg };
		});
	} else {
		throw new Error('No token found');
	}
}

export async function load({ url }) {
	try {
		const messages = await getMessages();
		return { messages };
	} catch {
		goto('/login?redirect=' + encodeURIComponent(url.pathname), { replaceState: true });
	}
}
