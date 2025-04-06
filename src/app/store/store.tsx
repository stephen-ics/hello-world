import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from '../slices/applicationSlice'
import terminalReducer from '../slices/terminalSlice'

export const Store = configureStore({
    reducer: {
        application: applicationReducer,
        terminal: terminalReducer,
    }
})