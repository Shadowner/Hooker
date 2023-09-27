import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
	const body = event.request.json().catch(() => null);

	if (!body) {
		throw error(400, 'No body provided');
	}

	return json({ message: 'Hello from the server!' });
}
