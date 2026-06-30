import type { DinPatraDatabase } from '@/db/database'

/**
 * Placeholder boundary for all persistent application state.
 * Repositories will depend on this service rather than on Dexie directly.
 */
export interface StorageService {
  readonly database: DinPatraDatabase
  ready(): Promise<void>
}

export function createStorageService(
  database: DinPatraDatabase,
): StorageService {
  return {
    database,
    async ready() {
      throw new Error('Storage service is not implemented yet.')
    },
  }
}
