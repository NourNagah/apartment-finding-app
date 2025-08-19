import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { t } from '@/utils/i18n'
import { toast } from 'react-toastify'
import HomeSaleIcon from '@/assets/home-sale.svg'
import EgyptFlag from '@/assets/flags/eg.svg'
import type { FormState, SellDetails } from '@/utils/sell-helpers'
import { isFormValid as isFormValidHelper, isModalValid as isModalValidHelper, isValidFullName, computeHasUnsaved } from '@/utils/sell-helpers'

export default function SellPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    name: '',
    phoneCountry: '+20',
    phoneNumber: '',
    location: '',
    compound: '',
    propertyType: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [details, setDetails] = useState<SellDetails>({
    propertyName: '',
    bedrooms: '',
    bathrooms: '',
    completion: '',
    furnished: 'no',
    delivery: ''
  })
  const [error, setError] = useState<string | null>(null)
  const hasUnsaved = useMemo(() => computeHasUnsaved(form, details), [form, details])
  const [modalSubmitted, setModalSubmitted] = useState(false)

  const isFormValid = useMemo(() => isFormValidHelper(form), [form])
  const isModalValid = useMemo(() => isModalValidHelper(details), [details])

  const furnishedDisabled = details.completion === 'not finished' || details.completion === 'semi finished'
  useEffect(() => {
    if (furnishedDisabled && details.furnished !== 'no') {
      setDetails((d) => ({ ...d, furnished: 'no' }))
    }
  }, [furnishedDisabled])

  // Warn with toast when navigating away with unsaved changes (client-side) to prevent data loss
  useEffect(() => {
    const onRouteChangeStart = () => {
      if (hasUnsaved) {
        toast.warning(t('forms.leaveWarning'))
        // eslint-disable-next-line no-throw-literal
        throw 'Abort route change due to unsaved changes'
      }
    }
    router.events.on('routeChangeStart', onRouteChangeStart)
    return () => router.events.off('routeChangeStart', onRouteChangeStart)
  }, [hasUnsaved, router.events])

  // Browser tab close warning
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsaved) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [hasUnsaved])

  function openModal(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitted(true)
    if (!isFormValid) { setError('Please complete all required fields.'); return }
    setModalSubmitted(false)
    setIsModalOpen(true)
  }

  async function submitRequest() {
    setError(null)
    setModalSubmitted(true)
    if (!isModalValid) { setError('Please complete all details in the modal.'); return }
    setIsModalOpen(false)
    toast.success(t('forms.success'))
    setSubmitted(false)
    setForm({ name: '', phoneCountry: '+20', phoneNumber: '', location: '', compound: '', propertyType: '' })
    setDetails({ propertyName: '', bedrooms: '', bathrooms: '', completion: '', furnished: 'no', delivery: '' })
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Steps Diagram */}
      <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
        {[0,1,2].map((i) => (
          <div key={i} className="rounded-lg bg-[rgb(228,235,242)] p-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded border flex items-center justify-center mb-2 text-sm font-semibold">{i+1}</div>
            <div className="text-xs font-semibold mb-1">{t(`sell.steps.${i}.heading`)}</div>
            <div className="text-[0.75rem] text-gray-700">{t(`sell.steps.${i}.desc`)}</div>
          </div>
        ))}
      </div>

      <form onSubmit={openModal} className="space-y-5 p-6 rounded-lg border max-w-xl mx-auto bg-[rgb(228,235,242)]">
        <div className="w-full flex justify-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-lg">
            <HomeSaleIcon width={134} height={142} />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-base font-bold text-black">Complete The Form</div>
          <div className="text-sm text-gray-700">Your privacy is important to us. We won't publish or share your information with anyone</div>
        </div>

        <div>
          <input
            value={form.name}
            onChange={(e) => { if (/^[A-Za-z\s]*$/.test(e.target.value)) setForm({ ...form, name: e.target.value }) }}
            className="mt-1 w-full rounded border px-3 py-2 bg-white placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
            placeholder={t('forms.placeholders.fullName')}
          />
          {submitted && !isValidFullName(form.name) && <div className="text-xs text-red-600 mt-1">{t('forms.errors.fullName')}</div>}
        </div>

        <div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded px-2 border bg-white">
              <EgyptFlag width={18} height={18} />
              <span className="text-sm text-gray-700">+20</span>
            </div>
            <input value={form.phoneNumber} onChange={(e) => {/^\d*$/.test(e.target.value) && setForm({ ...form, phoneNumber: e.target.value })}} className="flex-1 rounded border px-3 py-2 bg-white placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" placeholder={t('forms.placeholders.phone')} />
          </div>
          {submitted && !(form.phoneNumber.trim().length >= 7) && <div className="text-xs text-red-600 mt-1">{t('forms.errors.phone')}</div>}
        </div>

        <div>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 bg-white placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" placeholder={t('forms.placeholders.location')} />
          {submitted && !form.location && <div className="text-xs text-red-600 mt-1">{t('forms.errors.required')}</div>}
        </div>

        <div>
          <input value={form.compound} onChange={(e) => setForm({ ...form, compound: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 bg-white placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" placeholder={t('forms.placeholders.compound')} />
          {submitted && !form.compound && <div className="text-xs text-red-600 mt-1">{t('forms.errors.required')}</div>}
        </div>

        <div>
          <div className="relative">
            <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value as FormState['propertyType'] })} className="mt-1 w-full rounded px-3 pr-9 py-2 bg-white border appearance-none hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300">
              <option value="">{t('forms.placeholders.select')}</option>
              <option value="apartment">{t('forms.types.apartment')}</option>
              <option value="studio">{t('forms.types.studio')}</option>
              <option value="villa">{t('forms.types.villa')}</option>
              <option value="twin house">{t('forms.types.twin')}</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
          {submitted && !form.propertyType && <div className="text-xs text-red-600 mt-1">{t('forms.errors.required')}</div>}
        </div>

        <div>
          <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 bg-white placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" rows={4} placeholder={`${t('forms.description')} (${t('forms.optional')})`} />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="rounded bg-primary-600 text-white px-6 py-2 min-w-40 w-full sm:w-auto">{t('buttons.submit')}</button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-3 sm:p-5">
          <div className="bg-white rounded-lg p-4 sm:p-5 w-full max-w-md sm:max-w-lg md:max-w-xl space-y-3 relative">
            <button onClick={() => setIsModalOpen(false)} aria-label="close" className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">×</button>
            <div className="text-lg font-semibold pr-6">{t('forms.propertyDetails')}</div>
            <div>
              <input value={details.propertyName} onChange={(e) => { if (/^[A-Za-z\s]*$/.test(e.target.value)) setDetails({ ...details, propertyName: e.target.value }) }} className="mt-1 w-full rounded border px-3 py-2 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" placeholder={t('forms.propertyName')} />
              {modalSubmitted && !details.propertyName && <div className="text-xs text-red-600 mt-1">{t('forms.errors.required')}</div>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input value={details.bedrooms} onChange={(e) => setDetails({ ...details, bedrooms: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" placeholder={`${t('forms.bedrooms')} (2)`} />
                {modalSubmitted && !/^\d+$/.test(details.bedrooms) && details.bedrooms && <div className="text-xs text-red-600 mt-1">{t('forms.errors.numeric')}</div>}
              </div>
              <div>
                <input value={details.bathrooms} onChange={(e) => setDetails({ ...details, bathrooms: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 hover:border-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200" placeholder={`${t('forms.bathrooms')} (1)`} />
                {modalSubmitted && !/^\d+$/.test(details.bathrooms) && details.bathrooms && <div className="text-xs text-red-600 mt-1">{t('forms.errors.numeric')}</div>}
              </div>
            </div>
            <div>
              <select value={details.completion} onChange={(e) => setDetails({ ...details, completion: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300" required>
                <option value="">{t('forms.placeholders.select')}</option>
                <option value="not finished">{t('forms.completionTypes.notFinished')}</option>
                <option value="semi finished">{t('forms.completionTypes.semiFinished')}</option>
                <option value="finished">{t('forms.completionTypes.finished')}</option>
              </select>
              {modalSubmitted && !details.completion && <div className="text-xs text-red-600 mt-1">{t('forms.errors.required')}</div>}
            </div>
            <div>
              <select value={details.furnished} onChange={(e) => setDetails({ ...details, furnished: e.target.value as SellDetails['furnished'] })} className={`mt-1 w-full rounded border px-3 py-2 hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 ${furnishedDisabled ? 'bg-gray-100 text-gray-400' : ''}`} disabled={furnishedDisabled}>
                <option value="">{t('forms.furnished')}?</option>
                <option value="no">{t('forms.no')}</option>
                <option value="yes">{t('forms.yes')}</option>
              </select>
            </div>
            <div>
              <select value={details.delivery} onChange={(e) => setDetails({ ...details, delivery: e.target.value })} className="mt-1 w-full rounded border px-3 py-2 hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300" required>
                <option value="">{t('forms.placeholders.select')}</option>
                <option value="delivered">{t('forms.delivered')}</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
              {modalSubmitted && !details.delivery && <div className="text-xs text-red-600 mt-1">{t('forms.errors.required')}</div>}
            </div>
            <div className="flex justify-center pt-2">
              <button onClick={submitRequest} className="px-3 py-2 bg-primary-600 text-white rounded w-full sm:w-auto min-w-40" disabled={!isModalValid}>{t('buttons.submit')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}