import { HTTP_METHODS } from '$lib/enum/HttpMethods';
import type { RequestHandlerMap } from '$lib/types/RequestHandlerMap';
import { MapPathToRequestHandler } from '../core/ApiCallHandler';

export function HttpMethod(baseRoute: string, path: string, methods: HTTP_METHODS = HTTP_METHODS.GET) {
	return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
		if (!MapPathToRequestHandler[path]) {
			MapPathToRequestHandler[path] = {} as RequestHandlerMap;
		}

		if (MapPathToRequestHandler[path][methods]) {
			throw new Error(`Method ${methods} already defined for path ${path}`);
		}

		MapPathToRequestHandler[path][methods] = descriptor.value;
	};
}

export const GET = (path: string) => HttpMethod(path, HTTP_METHODS.GET);
export const POST = (path: string) => HttpMethod(path, HTTP_METHODS.POST);
export const PUT = (path: string) => HttpMethod(path, HTTP_METHODS.PUT);
export const DELETE = (path: string) => HttpMethod(path, HTTP_METHODS.DELETE);
export const PATCH = (path: string) => HttpMethod(path, HTTP_METHODS.PATCH);
export const OPTIONS = (path: string) => HttpMethod(path, HTTP_METHODS.OPTIONS);
export const HEAD = (path: string) => HttpMethod(path, HTTP_METHODS.HEAD);
