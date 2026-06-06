import type {
  AuthData,
  AuthResponse,
  RegisterData,
  User,
} from "../types";
import { api } from "./api";

export const login = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }

  return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
