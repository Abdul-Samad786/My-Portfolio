// Empty string = same-origin /api (Vercel proxies to the backend in production).
const API_URL = import.meta.env.VITE_API_URL ?? '';
const TOKEN_KEY = 'admin_token';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function loginAdmin(username: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const body: ApiResponse<{ access_token: string }> = await response.json();
  if (!response.ok || !body.success) {
    throw new Error(body.message || 'Login failed');
  }
  return body.data.access_token;
}
