/**
 * Placeholder boundary for build-time orchestration and asset generation.
 * Runtime code should not depend on this module.
 */
export interface BuilderService {
  readonly name: 'builder-service'
  build(): Promise<void>
}

export function createBuilderService(): BuilderService {
  return {
    name: 'builder-service',
    async build() {
      throw new Error('Builder service is not implemented yet.')
    },
  }
}
