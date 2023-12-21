import type { HTTP_METHODS } from '$lib/enum/HttpMethods';
import type { RequestHandler } from '@sveltejs/kit';

export type RequestHandlerMap = { [key in HTTP_METHODS]: RequestHandler };
