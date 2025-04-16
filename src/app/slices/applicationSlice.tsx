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
        zIndexTerminal: 10,

        finderOpen: false,
        finderHide: true,
        finderFullscreen: false,
        finderWidth: 800,
        finderHeight: 600,
        finderX: -1,
        finderY: -1,
        finderTabDesktop: true,
        finderTabDownloads: false,
        finderDirectory: "Desktop",
        zIndexFinder: 10,
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
        selectTerminal: state => {
            state.zIndexTerminal = state.zIndexFinder + 1
        },

        openFinder: state => {
            state.finderOpen = true
        },
        closeFinder: (state, action) => {
            state.finderOpen = false

            state.finderWidth = action.payload.width;
            state.finderHeight = action.payload.height;
            state.finderX = action.payload.x;
            state.finderY = action.payload.y;
        },
        showFinder: state => {
            state.finderHide = false;
        },
        hideFinder: (state, action) => {
            state.finderHide = true;

            state.finderWidth = action.payload.width;
            state.finderHeight = action.payload.height;
            state.finderX = action.payload.x;
            state.finderY = action.payload.y;
        },
        maximizeFinder: (state, action) => {
            state.finderFullscreen = true;
            
            state.finderWidth = action.payload.width;
            state.finderHeight = action.payload.height;
            state.finderX = action.payload.x;
            state.finderY = action.payload.y;
        },
        minimizeFinder: state => {
            state.finderFullscreen = false;
        },
        openDesktopTab: state => {
            state.finderTabDesktop = true;
            state.finderTabDownloads = false;
        },
        openDownloadsTab: state => {
            state.finderTabDesktop = false;
            state.finderTabDownloads = true;
        },
        changeDirectory: (state, action) => {
            state.finderDirectory = action.payload;
        },
        selectFinder: state => {
            state.zIndexFinder = state.zIndexTerminal + 1
        }
    }
})

export const { openTerminal, closeTerminal, showTerminal, hideTerminal, maximizeTerminal, minimizeTerminal, selectTerminal, openFinder, closeFinder, showFinder, hideFinder, maximizeFinder, minimizeFinder, selectFinder, openDesktopTab, openDownloadsTab, changeDirectory  } = applicationSlice.actions
export default applicationSlice.reducer
