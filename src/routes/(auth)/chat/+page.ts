import { goto } from '$app/navigation';
import { getAccessToken } from '$lib/services/auth0.service';
import { PUBLIC_BACKEND_HOST } from '$env/static/public';

async function getMessages() {
	try {
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
	} catch (error) {
		console.error('Error getting messages:', error);
		return goto('/login?redirect=' + encodeURIComponent(window.location.pathname), {
			replaceState: true
		});
	}
}

export async function load() {
	return { messages: await getMessages() };
}
