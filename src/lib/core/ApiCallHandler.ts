// /api/user/coucou
// user sera définis par le controller
// coucou sera définis par une méthode contenant un décorateur @HttpMethod('coucou', HTTP_METHODS.GET)
import type { HTTP_METHODS } from '$lib/enum/HttpMethods';
import type { ControllerType } from '$lib/types/ControllerType';
import type { RequestHandlerMap } from '$lib/types/RequestHandlerMap';
import type { RequestEvent } from '@sveltejs/kit';
import * as tsoa from 'tsoa';

const BASE_PATH = '/api/';

export const MapPathToRequestHandler: Record<string, RequestHandlerMap> = {};
export const controllers = new Map<string, ControllerType<unknown>>();

export async function handleCall(HttpMethod: HTTP_METHODS, req: RequestEvent): Promise<Response> {
	const { url } = req;
	const realPath = url.pathname.replace(BASE_PATH, '');
	const [controller, ...path] = realPath.split('/');
	const controllerInstance = controllers.get(controller);

	if (!controllerInstance) {
		return new Response('Not found', { status: 404 });
	}

	const realPathWithoutController = path.join('/');
	return controllerInstance.call(HttpMethod, realPathWithoutController, req);
}
