import type { JwtPayload } from "jsonwebtoken";

export interface AuthorizationJwtToken extends JwtPayload {
    id: string;
    email: string;
    roles: string[];
}