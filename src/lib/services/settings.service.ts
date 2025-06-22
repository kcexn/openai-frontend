import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export interface Settings {
	defaultPrompt: string;
	prompt: Writable<string>;
}

export const settings: Settings = {
	defaultPrompt: 'You are a helpful AI assistant.',
	prompt: writable<string>('')
};
if (browser) {
	const storedPrompt = localStorage.getItem('prompt');
	if (storedPrompt) {
		settings.prompt.set(storedPrompt);
	}
	settings.prompt.subscribe((value) => {
		localStorage.setItem('prompt', value);
	});
}
