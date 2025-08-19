import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function NewApartmentPage() {
  const [token, setToken] = useState('')
  const [form, setForm] = useState({ unitName: '', unitNumber: '', project: '' })
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCreatedId(null)
    const res = await fetch(`${API_URL}/apartments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      const data = await res.json()
      setCreatedId(data.id)
    } else {
      const text = await res.text()
      setError(text || 'Failed to create')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Add Apartment</h1>
      <form onSubmit={submit} className="space-y-3 max-w-lg">
        <div>
          <label className="block text-sm text-gray-600">JWT Token</label>
          <input value={token} onChange={(e) => setToken(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" placeholder="Paste token from /auth/register or /auth/login" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Unit Name</label>
          <input value={form.unitName} onChange={(e) => setForm({ ...form, unitName: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Unit Number</label>
          <input value={form.unitNumber} onChange={(e) => setForm({ ...form, unitNumber: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Project</label>
          <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <button type="submit" className="rounded bg-primary-600 text-white px-4 py-2">Create</button>
        {createdId && <div className="text-green-700">Created {createdId}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}

