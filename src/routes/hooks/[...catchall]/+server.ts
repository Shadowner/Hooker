import { json } from '@sveltejs/kit';

export async function GET() {
	return json({ message: 'Hello from the server!' });
}

export function POST() {
	return json({ message: 'Hello from the server!' });
}
