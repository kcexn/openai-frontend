export async function load() {
	return { messages: [] as { id: string; role: string; content: string }[] };
}
