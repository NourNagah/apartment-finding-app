"use client"

import { useRouter } from 'next/router'
import SearchIcon from '@/assets/icons/search.svg'

function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center"><SearchIcon width={18} height={18} /></span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
      />
    </div>
  )
}

export default function SearchProjectHeader({ value, onChange, placeholder, showBack = false }: { value: string; onChange: (v: string) => void; placeholder: string; showBack?: boolean }) {
  const router = useRouter()
  return (
    <div className="flex items-center gap-3 w-full">
      {showBack && (
        <button onClick={() => router.back()} className="text-primary-700">←</button>
      )}
      <SearchInput value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}