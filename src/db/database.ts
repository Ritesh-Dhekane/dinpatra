import Dexie from 'dexie'

/**
 * Central Dexie entry point.
 * Table schemas will be introduced once the first storage-backed features land.
 */
export class DinPatraDatabase extends Dexie {
  constructor() {
    super('DinPatra')
  }
}

export const db = new DinPatraDatabase()
