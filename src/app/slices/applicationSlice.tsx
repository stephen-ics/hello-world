import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        terminalOpen: true,
        terminalHide: false,
        terminalFullscreen: false,
        terminalWidth: 500,
        terminalHeight: 300,
        terminalX: -1,
        terminalY: -1,

        finderOpen: false,
        finderHide: true,
        finderTabDesktop: true,
        finderTabDownloads: false,
    },

    reducers: {
        openTerminal: state => {
            state.terminalOpen = true
        },
        closeTerminal: (state, action) => {
            state.terminalOpen = false

            state.terminalWidth = action.payload.width;
            state.terminalHeight = action.payload.height;
            state.terminalX = action.payload.x;
            state.terminalY = action.payload.y;
        },
        showTerminal: state => {
            state.terminalHide = false;
        },
        hideTerminal: (state, action) => {
            state.terminalHide = true;

            state.terminalWidth = action.payload.width;
            state.terminalHeight = action.payload.height;
            state.terminalX = action.payload.x;
            state.terminalY = action.payload.y;
        },
        maximizeTerminal: (state, action) => {
            state.terminalFullscreen = true;
            state.terminalWidth = action.payload.width;
            state.terminalHeight = action.payload.height;
            state.terminalX = action.payload.x;
            state.terminalY = action.payload.y;
        },
        minimizeTerminal: state => {
            state.terminalFullscreen = false;
        },
        openFinder: state => {
            state.finderOpen = true
        },
        closeFinder: state => {
            state.finderOpen = false
        },
        showFinder: state => {
            state.finderHide = false;
        },
        hideFinder: state => {
            state.finderHide = true;
        },
        openDesktopTab: state => {
            state.finderTabDesktop = true;
            state.finderTabDownloads = false;
        },
        openDownloadsTab: state => {
            state.finderTabDesktop = false;
            state.finderTabDownloads = true;
        }
    }
})

export const { openTerminal, closeTerminal, showTerminal, hideTerminal, maximizeTerminal, minimizeTerminal, openFinder, closeFinder, showFinder, hideFinder, openDesktopTab, openDownloadsTab  } = applicationSlice.actions
export default applicationSlice.reducer
