import { json } from '@sveltejs/kit';
import { Controller, Get, Path, Post, Route } from 'tsoa';

@Route('test')
export class TestController extends Controller {
	@Get('{userId}')
	public test(@Path() userId: string) {
		return json({ test: userId });
	}

	@Post()
	public testPost() {
		return json({ test: 'test Post' });
	}
}
