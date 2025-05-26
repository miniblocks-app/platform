import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  projects: any[];
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  token: string;
  user: UserProfile;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post<AuthResponse>(`${API_URL}/api/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('auth', JSON.stringify(response.data));
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await axios.post<AuthResponse>(`${API_URL}/api/register`, data);
    return response.data;
  },

  async getProfile() {
    const authStr = localStorage.getItem('auth');
    if (!authStr) {
      throw new Error('No user found');
    }
    const auth = JSON.parse(authStr);
    return auth.user;
  },

  async updateProfile(data: Partial<UserProfile>) {
    const token = this.getToken();
    const response = await axios.put<AuthResponse>(`${API_URL}/api/profile/update`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update local storage with new data
    localStorage.setItem('auth', JSON.stringify(response.data));
    return response.data.user;
  },

  logout() {
    localStorage.removeItem('auth');
  },

  getToken() {
    const authStr = localStorage.getItem('auth');
    if (!authStr) return null;
    const auth = JSON.parse(authStr);
    return auth.token;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getAuthData() {
    const authStr = localStorage.getItem('auth');
    if (!authStr) return null;
    return JSON.parse(authStr);
  }
};