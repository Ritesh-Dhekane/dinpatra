/**
 * Placeholder boundary for locale selection and message resolution.
 * Translation resources will be wired in after data conventions are finalized.
 */
export interface LocalizationService {
  readonly locale: string
  translate(key: string): string
}

export function createLocalizationService(locale: string): LocalizationService {
  return {
    locale,
    translate() {
      throw new Error('Localization service is not implemented yet.')
    },
  }
}
