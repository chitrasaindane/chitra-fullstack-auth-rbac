export type Role = 'USER' | 'ADMIN';

export interface User {
    name: string;
    email: string;
    role: Role;
}

export interface AuthResponse {
    token: string;
    name: string;
    email: string;
    role: Role;
    message: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: Role;
}
