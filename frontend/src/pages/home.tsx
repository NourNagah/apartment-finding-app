import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { t, tr } from '@/utils/i18n'
import HomeSaleIcon from '@/assets/home-sale.svg'
import BuildingIcon from '@/assets/icons/building.svg'
import HomeIcon from '@/assets/icons/home.svg'
import VillaIcon from '@/assets/icons/villa.svg'
import SearchProjectHeader from '@/components/search/SearchProjectHeader'

export default function HomePage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  // derive URL only; data is pre-fetched elsewhere and cached
  const target = useMemo(() => '/search' + (q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''), [q])
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border shadow-sm min-h-[320px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://www.nawy.com/_next/static/media/landing-new-background.5e086e5d.webp')" }} aria-hidden />
        <div className="relative p-6 md:p-10 bg-black/30 text-white h-full flex flex-col justify-center">
          <h1 className="mb-2">{t('home.title')}</h1>
          <p className="mb-4 max-w-2xl">{t('home.subtitle')}</p>
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <SearchProjectHeader value={q} onChange={setQ} placeholder={t('search.placeholder')} showBack={false} />
            </div>
            <button onClick={() => router.push(target)} className="rounded bg-primary-600 text-white px-4 py-2">{t('home.searchCta')}</button>
          </div>
        </div>
      </section>

      <section onClick={() => router.push('/sell')} className="cursor-pointer bg-white rounded-xl border p-6 shadow-sm flex items-center gap-4">
        <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary-50">
          <HomeSaleIcon width={28} height={28} />
        </div>
        <div>
          <div className="text-lg font-medium">{t('home.sellTitle')}</div>
          <div className="text-gray-700">{t('home.sellSubtitle')}</div>
        </div>
      </section>

      <section className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('home.visionTitle')}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tr<string[]>('home.visionItems', []).map((txt, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-50 shrink-0">
                {idx % 3 === 0 ? <BuildingIcon width={22} height={22} /> : idx % 3 === 1 ? <HomeIcon width={22} height={22} /> : <VillaIcon width={22} height={22} />}
              </div>
              <p className="text-gray-800">{txt}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

