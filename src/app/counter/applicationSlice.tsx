import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        terminalOpen: true
    },

    reducers: {
        openTerminal: state => {
            state.terminalOpen = true
        },
        closeTerminal: state => {
            state.terminalOpen = false
        }
    }
})

export const { openTerminal, closeTerminal } = applicationSlice.actions
export default applicationSlice.reducer
