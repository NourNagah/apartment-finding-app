import { API_URL } from '@/constants/routes.constants'
import { getCached, setCached } from './cache'

export async function apiFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, init)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed: ${res.status}`)
  }
  return res.json()
}

export async function loginOrRegister(mode: 'login' | 'register', email: string, password: string) {
  return apiFetch(`/auth/${mode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
}

export async function listApartments(limit = 9999, offset = 0) {
  const cacheKey = `apartments:${limit}:${offset}`
  const cached = getCached<any>(cacheKey)
  if (cached) return cached
  const data = await apiFetch(`/apartments?limit=${limit}&offset=${offset}`)
  setCached(cacheKey, data, 5 * 60 * 1000)
  return data
}

export async function getApartment(id: string) {
  const cacheKey = `apartment:${id}`
  const cached = getCached<any>(cacheKey)
  if (cached) return cached
  const data = await apiFetch(`/apartments/${id}`)
  setCached(cacheKey, data, 5 * 60 * 1000)
  return data
}

export async function createApartment(token: string, payload: any) {
  return apiFetch('/apartments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
}