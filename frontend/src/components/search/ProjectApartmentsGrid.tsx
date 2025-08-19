import Link from 'next/link'
import type { Apartment } from '@/constants/apartment-types.constants'
import HomeIcon from '@/assets/icons/home.svg'

export default function ProjectApartmentsGrid({ items, baseHref }: { items: Apartment[]; baseHref: string }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((a) => (
        <li key={a.id} className="rounded-lg border bg-white hover:shadow-md transition">
          <Link href={`${baseHref}/${a.id}`} className="block">
            <div className="w-full h-48 bg-blue-50 rounded-t-lg flex items-center justify-center">
              <HomeIcon width={56} height={56} />
            </div>
            <div className="p-4 space-y-2">
              <div className="font-semibold text-lg">{a.unitName}</div>
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <span>{a.bedrooms ?? 2} bd</span>
                <span>•</span>
                <span>{a.bathrooms ?? 1} ba</span>
                {a.areaSqm ? (<><span>•</span><span>{a.areaSqm} m²</span></>) : null}
              </div>
              {a.priceUsd && (
                <div className="text-primary-700 font-medium">${Number(a.priceUsd).toLocaleString()}</div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}