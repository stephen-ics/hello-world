import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from './slices/applicationSlice'

export const Store = configureStore({
    reducer: {
        application: applicationReducer,
    }
})