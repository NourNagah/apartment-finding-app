import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { t } from '@/utils/i18n'
import { getApartment } from '@/utils/apis'
import type { Apartment } from '@/constants/apartment-types.constants'
import HomeIcon from '@/assets/icons/home.svg'

export default function ApartmentDetailPage() {
  const router = useRouter()
  const { projectId, apartmentId } = router.query as { projectId?: string; apartmentId?: string }
  const [apartment, setApartment] = useState<Apartment | null>(null)

  useEffect(() => {
    if (!apartmentId) return
    getApartment(apartmentId)
      .then((data) => setApartment(data as Apartment))
      .catch(() => setApartment(null))
  }, [apartmentId])

  if (!apartment) return <div>Not found</div>

  return (
    <div className="space-y-4">
      <button onClick={() => router.back()} className="text-primary-700">{t('buttons.back')}</button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="w-full h-80 bg-blue-50 rounded-lg flex items-center justify-center">
            <HomeIcon width={64} height={64} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{apartment.type ? `${apartment.type} - ${apartment.unitName}` : apartment.unitName}</h1>
          <div className="text-gray-600">Compound: {apartment.project}</div>
          <div className="text-gray-700">Bedrooms: {apartment.bedrooms ?? 2}</div>
          <div className="text-gray-700">Bathrooms: {apartment.bathrooms ?? 3}</div>
          <div className="text-gray-700">Delivery In: 2028</div>
          <div className="text-gray-700">Finishing: Semi Finished</div>
          <div className="text-gray-700">Reference No.: 84771</div>
          <div className="text-gray-700">Area: {apartment.areaSqm ?? 95}m² ~ {(apartment.areaSqm ?? 95) + 5}m²</div>
          <div className="text-gray-800 mt-3">About Apartment</div>
          <p className="text-gray-700">A {apartment.bedrooms ?? 2} bedroom {apartment.type ?? 'Apartment'} in {apartment.project}. The size is {apartment.areaSqm ?? 94} m2 with {apartment.bathrooms ?? 3} bathrooms. This property will be ready for delivery semi-finished by 2028-01-01.</p>
        </div>
      </div>
    </div>
  )
}

