import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '../features/search/search-slice'
import { suggestionsReducer } from '../features/suggestions/suggestions-slice'
import { currentWeatherReducer } from '../features/currentWeather/currentWeather-slice'
import { airQualityReducer } from '../features/currentWeather/chunks/airQuality/airQuality-slice'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        suggestions: suggestionsReducer,
        currentWeather: currentWeatherReducer,
        airQuality: airQualityReducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({
      serializableCheck: false,
    })
})