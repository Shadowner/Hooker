import * as jwt from 'jsonwebtoken';

//TODO : Implement secret
export async function verifyToken<T extends jwt.JwtPayload>(token: string): Promise<string | T> {
	return new Promise((resolve, reject) => {
		try {
			const decodedToken = jwt.verify(token, 'process.env.JWT_SECRET') as string | T;
			return resolve(decodedToken);
		} catch (error) {
			return reject(error);
		}
	});
}

export async function decodeToken<T extends jwt.JwtPayload>(token: string) {
	return new Promise<T>((resolve, reject) => {
		try {
			const decodedToken = jwt.decode(token) as T;
			return resolve(decodedToken);
		} catch (error) {
			return reject(error);
		}
	});
}

export function signToken<T extends jwt.JwtPayload>(payload: T) {
	return new Promise<string>((resolve, reject) => {
		try {
			return resolve(jwt.sign(payload, 'process.env.JWT_SECRET'));
		} catch (error) {
			return reject(error);
		}
	});
}
