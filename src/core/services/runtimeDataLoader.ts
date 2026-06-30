/**
 * Placeholder boundary for generated JSON loaded at runtime.
 * Parsing and transformation stay out of this module for now.
 */
export interface RuntimeDataLoader {
  readonly name: 'runtime-data-loader'
  loadJson<T>(resourcePath: string): Promise<T>
}

export function createRuntimeDataLoader(): RuntimeDataLoader {
  return {
    name: 'runtime-data-loader',
    async loadJson() {
      throw new Error('Runtime data loader is not implemented yet.')
    },
  }
}
