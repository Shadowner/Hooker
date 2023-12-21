import type { HTTP_METHODS } from '$lib/enum/HttpMethods';
import type { RequestEvent } from '@sveltejs/kit';
import { getDecorators, type ClassDeclaration } from 'typescript';

export abstract class BaseController {
	constructor(private readonly node: ClassDeclaration) {}

	public call(method: HTTP_METHODS, path: string, req: RequestEvent) {
		//TODO: prendre en compte des paramètres dans l'url (ex: /api/user/:id)

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const methodToCall = this[path];
		//Get the decorators of the method
		const _decorators = getDecorators(methodToCall);

		if (!methodToCall) {
			return new Response('Not found', { status: 404 });
		}

		return methodToCall(req);
	}
}
