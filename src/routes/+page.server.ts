import { auth0Credentials } from '$lib/data/auth0';

export async function load() {
    return { auth0Credentials };
}
