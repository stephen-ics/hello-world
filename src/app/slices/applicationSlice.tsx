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

        folderOpen: false,
        folderHide: true,
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
        },

        openFolder: state => {
            state.folderOpen = true
        },
        closeFolder: state => {
            state.folderOpen = false
        },
        showFolder: state => {
            state.folderHide = false;
        },
        hideFolder: state => {
            state.folderHide = true;
        },
    }
})

export const { openTerminal, closeTerminal, showTerminal, hideTerminal, maximizeTerminal, minimizeTerminal, openFolder, closeFolder, showFolder, hideFolder  } = applicationSlice.actions
export default applicationSlice.reducer
