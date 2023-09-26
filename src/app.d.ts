// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { AuthorizationJwtToken } from "./types/AuthorizationJwtToken";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: AuthorizationJwtToken;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
