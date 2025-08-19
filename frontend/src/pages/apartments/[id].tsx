import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getApartment as getApartmentApi } from '@/utils/apis'
import HomeIcon from '@/assets/icons/home.svg'

export default function ApartmentPage() {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  const [a, setA] = useState<any | null>(null)

  useEffect(() => {
    if (!id) return
    getApartmentApi(id).then(setA).catch(() => setA(null))
  }, [id])

  if (!a) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <Link href="/search" className="text-sm text-primary-700">← Back to search</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="w-full h-80 bg-blue-50 rounded-lg flex items-center justify-center">
            <HomeIcon width={64} height={64} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{a.unitName}</h1>
          <div className="text-gray-600">Unit {a.unitNumber} • {a.project}</div>
          <div className="text-gray-700">{a.bedrooms} bd • {a.bathrooms} ba {a.areaSqm ? `• ${a.areaSqm} sqm` : ''}</div>
          {a.priceUsd && <div className="text-xl text-primary-700 font-medium mt-2">${Number(a.priceUsd).toLocaleString()}</div>}
          {a.description && <p className="text-gray-800 mt-3 whitespace-pre-line">{a.description}</p>}
        </div>
      </div>
    </div>
  )
}

