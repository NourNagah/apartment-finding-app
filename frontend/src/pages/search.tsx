import { useEffect, useMemo, useRef, useState } from 'react'
import SearchProjectHeader from '@/components/search/SearchProjectHeader'
import SearchProjectCard from '@/components/search/SearchProjectCard'
import { t } from '@/utils/i18n'
import { listApartments } from '@/utils/apis'
import { getCached, setCached } from '@/utils/cache'
import { useRouter } from 'next/router'
import type { Project, Apartment } from '@/constants/apartment-types.constants'

function aggregateProjects(apartments: Apartment[]): Project[] {
  const map = new Map<string, Project>()
  apartments.forEach((a) => {
    const key = a.project
    const existing = map.get(key)
    const price = a.priceUsd ? Number(a.priceUsd) : undefined
    if (!existing) {
      map.set(key, {
        id: key,
        name: key,
        location: 'Egypt',
        developer: 'Nawy',
        description: `Discover Nawy's properties with Egypt`,
        startingPriceUsd: price ? price.toFixed(2) : undefined,
        resalePriceUsdEstimated: price ? (price * 0.9).toFixed(2) : undefined,
        image: a.images?.[0],
        apartments: [a]
      })
    } else {
      existing.apartments.push(a)
      if (price !== undefined) {
        const current = existing.startingPriceUsd ? Number(existing.startingPriceUsd) : price
        const min = Math.min(current, price)
        existing.startingPriceUsd = min.toFixed(2)
        existing.resalePriceUsdEstimated = (min * 0.9).toFixed(2)
      }
      if (!existing.image && a.images?.[0]) existing.image = a.images[0]
    }
  })
  return Array.from(map.values())
}

export default function SearchPage() {
  const router = useRouter()
  const [q, setQ] = useState(typeof router.query.q === 'string' ? router.query.q : '')
  const [projects, setProjects] = useState<Project[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const loadingRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cached = getCached<{ items: Apartment[]; offset: number; hasMore: boolean }>('search:list')
    if (cached) {
      setProjects(aggregateProjects(cached.items))
      setOffset(cached.offset)
      setHasMore(cached.hasMore)
      return
    }
    // initial load 20
    loadingRef.current = true
    listApartments(20, 0)
      .then((data) => {
        const items = data.data as Apartment[]
        setProjects(aggregateProjects(items))
        setOffset(20)
        setHasMore(items.length === 20)
        setCached('search:list', { items, offset: 20, hasMore: items.length === 20 }, 5 * 60 * 1000)
      })
      .catch(() => setProjects([]))
      .finally(() => { loadingRef.current = false })
  }, [])

  // intersection observer for mid-page load
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true
          listApartments(20, offset)
            .then((data) => {
              const more = data.data as Apartment[]
              const cached = getCached<{ items: Apartment[]; offset: number; hasMore: boolean }>('search:list')
              const combined = [...(cached?.items || []), ...more]
              setProjects(aggregateProjects(combined))
              const nextOffset = offset + more.length
              const nextHasMore = more.length === 20
              setOffset(nextOffset)
              setHasMore(nextHasMore)
              setCached('search:list', { items: combined, offset: nextOffset, hasMore: nextHasMore }, 5 * 60 * 1000)
            })
            .finally(() => { loadingRef.current = false })
        }
      })
    }, { root: null, rootMargin: '200px 0px', threshold: 0.01 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [offset, hasMore])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return projects
    return projects.filter((p) => p.name.toLowerCase().includes(s))
  }, [q, projects])

  return (
    <div className="space-y-6">
      <SearchProjectHeader value={q} onChange={setQ} placeholder={t('search.placeholder')} showBack={false} />
      <div className="space-y-3">
        {filtered.map((p) => (
          <SearchProjectCard key={p.id} project={p} href={`/search/${p.id}`} />
        ))}
        <div ref={sentinelRef} className="h-6" aria-hidden />
      </div>
    </div>
  )
}

