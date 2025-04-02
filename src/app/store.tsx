import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import applicationReducer from './counter/applicationSlice'

export const Store = configureStore({
    reducer: {
        counter: counterReducer,
        application: applicationReducer,
    }
})