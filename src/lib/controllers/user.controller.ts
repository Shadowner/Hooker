import { GET } from '$lib/decorators/HttpDecorators';
import { json } from '@sveltejs/kit';

export const route = 'users';
export default class UserController {
	@GET('')
	public async getUsers() {
		return json({ User: 'test' });
	}
}
