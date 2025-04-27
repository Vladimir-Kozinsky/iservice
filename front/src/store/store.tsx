import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer/authReducer'
import aircraftReducer from './reducers/aircraftReducer/aircraftReducer'
import engineReducer from './reducers/engineReducer/engineReducer'
import legReducer from './reducers/legReducer/legReducer'
import apuReducer from './reducers/apuReducer/apuReducer'
import gearReducer from './reducers/gearReducer/gearReducer'
import storeReducer from './reducers/storeReducer/storeReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        aircraft: aircraftReducer,
        engine: engineReducer,
        apu: apuReducer,
        leg: legReducer,
        gear: gearReducer,
        store: storeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch