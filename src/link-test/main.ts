import { HTTP_METHODS } from '$lib/enum/HttpMethods';

getResponse('/api/user/1', HTTP_METHODS.GET, new Request());
getResponse('/api/user/create', HTTP_METHODS.POST, new Request());

function getResponse(path: string, method: HTTP_METHODS, req: Request) {
	const realPath = path.replace('/api/', '');
	const [controller, ...pathArgs] = realPath.split('/');
	const pathWithoutController = pathArgs.join('/');
}
