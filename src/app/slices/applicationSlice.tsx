import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        terminalOpen: true,
        terminalHide: false,
        terminalFullscreen: false,
        terminalOriginalWidth: 0,
        terminalOriginalHeight: 0,
        terminalOriginalX: 0,
        terminalOriginalY: 0,
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
        maximizeTerminal: (state, action) => {
            state.terminalFullscreen = true;
            state.terminalOriginalWidth = action.payload.width;
            state.terminalOriginalHeight = action.payload.height;
            state.terminalOriginalX = action.payload.x;
            state.terminalOriginalY = action.payload.y;
        },
        minimizeTerminal: state => {
            state.terminalFullscreen = false;
        }
    }
})

export const { openTerminal, closeTerminal, showTerminal, hideTerminal, maximizeTerminal, minimizeTerminal  } = applicationSlice.actions
export default applicationSlice.reducer
