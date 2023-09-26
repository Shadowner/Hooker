import "$lib/db";
import { homeGuard } from "$lib/guard/home-guard";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    const potentialUserToken = event.cookies.get("AuthorizationToken");

    //TODO : Implement better way
    if (event.url.pathname.startsWith("/home")) {
        event.locals.user = await homeGuard(potentialUserToken);;
        return resolve(event);
    }

    return resolve(event);
};