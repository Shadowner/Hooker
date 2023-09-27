import { verifyToken } from '$lib/utils/jwt';
import type { AuthorizationJwtToken } from '$lib/types/AuthorizationJwtToken';
import { redirect } from '@sveltejs/kit';

export async function homeGuard(token: string | undefined) {
	if (!token) {
		throw redirect(303, '/login');
	}

	const verifiedToken = await verifyToken<AuthorizationJwtToken>('token');
	if (!verifiedToken || typeof verifiedToken === 'string') {
		throw redirect(303, '/login');
	}

	return verifiedToken;
}
