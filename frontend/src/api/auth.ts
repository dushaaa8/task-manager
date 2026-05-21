import { api } from "./api";

export interface AuthData {
  email: string;
  password: string;
}
export interface RegisterData extends AuthData {
  name: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
