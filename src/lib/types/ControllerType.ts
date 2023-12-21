import type { HTTP_METHODS } from '$lib/enum/HttpMethods';
import type { RequestEvent } from '@sveltejs/kit';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ControllerType<T> = OnlyMethods<T> &
	MeetsConstraints<T> & {
		call: (method: HTTP_METHODS, path: string, req: RequestEvent) => Promise<Response>;
	};

type OnlyMethods<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => Response | Promise<Response> ? T[K] : never;
};

type ParamsLength<F extends (...args: any) => any> = Parameters<F>['length'];
type AcceptableMethod = (...args: any[]) => Promise<Response> | Response | void;
type Invalid<T> = T & Error; // workaround for Microsoft/TypeScript#23689

export type MeetsConstraints<T> = {
	[K in keyof T]: T[K] extends (...args: any) => any
		? ParamsLength<T[K]> extends ParamsLength<AcceptableMethod>
			? AcceptableMethod
			: T[K] extends AcceptableMethod
			? Invalid<['Expected', ParamsLength<AcceptableMethod>, 'parameters, got', ParamsLength<T[K]>]>
			: AcceptableMethod
		: T[K];
};
