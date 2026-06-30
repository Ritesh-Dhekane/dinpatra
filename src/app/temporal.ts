import {
  createTemporalEngine,
  type TemporalEngine,
} from '@/core/temporal'
import {
  createRuntimeCalendarNavigator,
  createRuntimeCalendarProvider,
  createRuntimeDateResolver,
  createRuntimeLocalizationProvider,
  createRuntimeTemporalRepository,
} from '@/data/runtimeTemporal'

const repository = createRuntimeTemporalRepository()
const localizationProvider = createRuntimeLocalizationProvider()
const calendarProvider = createRuntimeCalendarProvider(
  repository,
  localizationProvider,
)

export const temporalEngine: TemporalEngine = createTemporalEngine({
  dateResolver: createRuntimeDateResolver(),
  calendarProvider,
  localizationProvider,
  navigator: createRuntimeCalendarNavigator(),
})
