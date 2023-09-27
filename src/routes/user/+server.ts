import db from '$lib/db';
import { UserModel } from '$lib/models/UserModel';
import { json } from '@sveltejs/kit';

export async function POST() {
	const userRepo = db.getDb().getRepository(UserModel);
	const user = userRepo.create({});

	await userRepo.save(user);

	return json({ message: 'Hello from the server!', user });
}

export async function GET() {
	const userRepo = db.getDb().getRepository(UserModel);
	const users = await userRepo.find();
	return json({ message: 'Hello from the server!', users });
}
