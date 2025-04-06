import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        terminalOpen: true,
        terminalHide: false
    },

    reducers: {
        openTerminal: state => {
            state.terminalOpen = true
        },
        closeTerminal: state => {
            state.terminalOpen = false
        },
        showTerminal: state => {
            state.terminalHide = false;
        },
        hideTerminal: state => {
            state.terminalHide = true;
        },
    }
})

export const { openTerminal, closeTerminal, showTerminal, hideTerminal  } = applicationSlice.actions
export default applicationSlice.reducer
