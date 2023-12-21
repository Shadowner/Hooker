/* eslint-disable @typescript-eslint/no-explicit-any */

import { controllers } from '$lib/core/ApiCallHandler';
import type { ControllerType } from '$lib/types/ControllerType';

function addController(route: string, controller: ControllerType<unknown>) {
	controllers.set(route, controller);
	console.log(controllers);
}

export function Controller(route: string) {
	return function (target: new () => ControllerType<unknown>) {
		addController(route, new target());
	};
}
