import { handleCall } from '$lib/core/ApiCallHandler.js';
import { HTTP_METHODS } from '$lib/enum/HttpMethods.js';

export function POST(_req) {
	return handleCall(HTTP_METHODS.POST, _req);
}

export function GET(_req) {
	return handleCall(HTTP_METHODS.GET, _req);
}

export function PUT(_req) {
	return handleCall(HTTP_METHODS.PUT, _req);
}

export function DELETE(_req) {
	return handleCall(HTTP_METHODS.DELETE, _req);
}

export function PATCH(_req) {
	return handleCall(HTTP_METHODS.PATCH, _req);
}

export function OPTIONS(_req) {
	return handleCall(HTTP_METHODS.OPTIONS, _req);
}

export function HEAD(_req) {
	return handleCall(HTTP_METHODS.HEAD, _req);
}
