import { User } from "../types";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
    token: string;
    username?: string;
    // user?: User;
    message?: string;
}

export interface RegisterCredentials{
  fullname: string;
  username: string;
  email: string;
  password: string;
}
