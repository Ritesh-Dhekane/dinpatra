import { useRegisterSW } from 'virtual:pwa-register/react'

export function ServiceWorkerRegistration() {
  useRegisterSW({ immediate: true })
  return null
}
