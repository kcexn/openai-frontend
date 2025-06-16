export async function load() {
	return { messages: [] as { role: string; content: string }[] };
}
