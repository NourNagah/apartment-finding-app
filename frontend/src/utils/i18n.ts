import en from '@/locales/en.json'

type Dict = Record<string, any>

function get(obj: Dict, path: string): any {
  return path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj)
}

export function t(key: string): string {
  const v = get(en as Dict, key)
  if (v === undefined || v === null) return key
  return typeof v === 'string' ? v : String(v)
}

export function tr<T = any>(key: string, fallback?: T): T {
  const v = get(en as Dict, key)
  return (v as T) ?? (fallback as T)
}

export function tt(key: string, vars?: Record<string, string | number>): string {
  let template = t(key)
  if (!vars) return template
  Object.entries(vars).forEach(([k, v]) => {
    template = template.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
  })
  return template
}