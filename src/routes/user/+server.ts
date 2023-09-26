import db from "$lib/db";
import { json } from "@sveltejs/kit";
import { UserModel } from "../../models/UserModel";

export async function POST() {
    const userRepo = db.getDb().getRepository(UserModel);
    let user = userRepo.create({
    });

    await userRepo.save(user);

    return json({ message: "Hello from the server!", user });
}

export async function GET() {
    const userRepo = db.getDb().getRepository(UserModel);
    let users = await userRepo.find();
    return json({ message: "Hello from the server!", users });
}