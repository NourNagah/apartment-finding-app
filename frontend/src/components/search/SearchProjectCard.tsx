import Link from 'next/link'
import type { Project } from '@/constants/apartment-types.constants'
import BuildingIcon from '@/assets/icons/building.svg'

export default function SearchProjectCard({ project, href }: { project: Project; href: string }) {
  return (
    <Link href={href} className="flex gap-4 rounded-lg border bg-white hover:shadow-md transition overflow-hidden">
      <div className="w-48 h-32 flex items-center justify-center bg-blue-50">
        <BuildingIcon width={48} height={48} />
      </div>
      <div className="py-3 pr-4 flex-1">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span aria-hidden>📍</span>
          <span>{project.location}</span>
        </div>
        <div className="text-lg font-semibold">{project.name}</div>
        <div className="text-sm text-gray-700 mt-1">{project.description}</div>
        <div className="mt-2 text-sm">
          <span className="text-gray-600">Starting from </span>
          <span className="font-medium">${Number(project.startingPriceUsd || '0').toLocaleString()}</span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="text-gray-600">Resale (Est.) </span>
          <span className="font-medium">${Number(project.resalePriceUsdEstimated || '0').toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}