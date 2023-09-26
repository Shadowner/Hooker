import { decode, sign, type JwtPayload, verify } from 'jsonwebtoken';

//TODO : Implement secret
export async function verifyToken<T extends JwtPayload>(token: string): Promise<string | T> {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = verify(token, "process.env.JWT_SECRET") as string | T;
            return resolve(decodedToken);
        } catch (error) {
            return reject(error);
        }
    });
}

export async function decodeToken<T extends JwtPayload>(payload: any) {
    return new Promise<T>((resolve, reject) => {
        try {
            const decodedToken = decode(payload) as T;
            return resolve(decodedToken);
        } catch (error) {
            return reject(error);
        }
    });
}

export function signToken<T extends JwtPayload>(payload: T) {
    return new Promise<string>((resolve, reject) => {
        try {
            return resolve(sign(payload, "process.env.JWT_SECRET"));
        } catch (error) {
            return reject(error);
        }
    });
}
