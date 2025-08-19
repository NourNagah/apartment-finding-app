import { useEffect, useMemo, useState } from 'react'
import ProjectApartmentsGrid from '@/components/search/ProjectApartmentsGrid'
import SearchProjectHeader from '@/components/search/SearchProjectHeader'
import { tt } from '@/utils/i18n'
import { listApartments } from '@/utils/apis'
import type { Apartment } from '@/constants/apartment-types.constants'
import { useRouter } from 'next/router'

export default function ProjectPage() {
  const router = useRouter()
  const { projectId } = router.query as { projectId?: string }
  const [apartments, setApartments] = useState<Apartment[]>([])

  useEffect(() => {
    listApartments(9999, 0)
      .then((data) => setApartments(data.data as Apartment[]))
      .catch(() => setApartments([]))
  }, [])

  const projectName = projectId || ''
  const projectApartments = useMemo(() => apartments.filter((a) => a.project === projectName), [apartments, projectName])
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return projectApartments
    return projectApartments.filter((a) => a.unitName.toLowerCase().includes(s))
  }, [q, projectApartments])

  return (
    <div className="space-y-6">
      <SearchProjectHeader value={q} onChange={setQ} placeholder={tt('search.inProject', { project: projectName })} showBack />
      <ProjectApartmentsGrid items={filtered} baseHref={`/search/${projectName}`} />
    </div>
  )
}

