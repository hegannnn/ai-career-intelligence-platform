import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 120_000,
});

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.code === 'ECONNABORTED') return 'Request timed out. The ML model may still be loading — try again.';
    if (!err.response) return 'Cannot reach the backend. Start it with: uvicorn app.main:app --reload --port 8000';
    const detail = err.response.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) return detail.map((d: { msg?: string }) => d.msg).join(', ');
    return err.response.data?.message ?? `Server error (${err.response.status})`;
  }
  return err instanceof Error ? err.message : 'Something went wrong';
}
