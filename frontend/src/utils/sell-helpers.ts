export type FormState = {
  name: string
  phoneCountry: string
  phoneNumber: string
  location: string
  compound: string
  propertyType: 'apartment' | 'studio' | 'villa' | 'twin house' | ''
  description?: string
}

export type SellDetails = {
  propertyName: string
  bedrooms: string
  bathrooms: string
  completion: string
  furnished: '' | 'no' | 'yes'
  delivery: string
}

export function isValidFullName(fullName: string): boolean {
  return /^[A-Za-z]+\s[A-Za-z]+$/.test(fullName.trim())
}

export function isValidPhone(phoneNumber: string): boolean {
  return phoneNumber.trim().length >= 7
}

export function isFormValid(form: FormState): boolean {
  return (
    isValidFullName(form.name) &&
    isValidPhone(form.phoneNumber) &&
    !!form.location &&
    !!form.compound &&
    !!form.propertyType
  )
}

export function isModalValid(details: SellDetails): boolean {
  const bedsOk = /^\d+$/.test(details.bedrooms)
  const bathsOk = /^\d+$/.test(details.bathrooms)
  const completionOk = ['not finished', 'semi finished', 'finished'].includes(details.completion)
  const deliveryOk = ['delivered', '2025', '2026', '2027', '2028'].includes(details.delivery)
  return bedsOk && bathsOk && completionOk && deliveryOk && !!details.propertyName
}

export function computeHasUnsaved(form: FormState, details: SellDetails): boolean {
  return !!(
    form.name ||
    form.phoneNumber ||
    form.location ||
    form.compound ||
    form.propertyType ||
    form.description ||
    details.propertyName ||
    details.bedrooms ||
    details.bathrooms ||
    details.completion ||
    details.delivery
  )
}

