import { json } from "@sveltejs/kit";


export function POST() {
    return json({ message: "Hello from the server!" });
}