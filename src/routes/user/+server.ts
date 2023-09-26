import db from "$lib/db";
import { json } from "@sveltejs/kit";
import { UserModel } from "../../models/UserModel";

export async function POST() {
    const userRepo = db.getDb().getRepository(UserModel);
    let user = userRepo.create({
        age: Math.round(Math.random() * 100),
        firstName: Math.random().toString(36).substring(7),
        lastName: Math.random().toString(36).substring(7),
    });

    await userRepo.save(user);

    return json({ message: "Hello from the server!", user });
}

export async function GET() {
    const userRepo = db.getDb().getRepository(UserModel);
    let users = await userRepo.find();
    return json({ message: "Hello from the server!", users });
}