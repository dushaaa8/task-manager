export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  name: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
