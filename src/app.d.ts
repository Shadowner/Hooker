// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserModel } from "./models/UserModel";
import type { AuthorizationJwtToken } from "./types/AuthorizationJwtToken";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: AuthorizationJwtToken;
		}
		interface PageData {
			user?:UserModel
		}
		// interface Platform {}
	}
}

export { };
