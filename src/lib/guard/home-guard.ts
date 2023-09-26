import { InvalidTokenError } from "$lib/errors/Token/InvalidTokenError";
import { verifyToken } from "$lib/jwt";
import { redirect } from "@sveltejs/kit";
import type { AuthorizationJwtToken } from "../../types/AuthorizationJwtToken";


export async function homeGuard(token: string | undefined) {

    if (!token) {
        throw redirect(303, "/login");
    }

    const verifiedToken = await verifyToken<AuthorizationJwtToken>("token");
    if (!verifiedToken || typeof verifiedToken === "string") {
        throw redirect(303, "/login");
    }

    return verifiedToken;
}