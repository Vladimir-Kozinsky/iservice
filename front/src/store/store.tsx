import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer/authReducer'
import aircraftReducer from './reducers/aircraftReducer/aircraftReducer'
import engineReducer from './reducers/engineReducer/engineReducer'
import legReducer from './reducers/legReducer/legReducer'
import apuReducer from './reducers/apuReducer/apuReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        aircraft: aircraftReducer,
        engine: engineReducer,
        apu: apuReducer,
        leg: legReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch