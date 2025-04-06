import { createSlice } from '@reduxjs/toolkit'

export const terminalSlice = createSlice({
    name: 'terminal',
    initialState: {
        history: ["Welcome to my world! 🐢\nType 'help' to view a list of available commands\nFeel free to click around, everything's interactive :)\nEnjoy your stay!"],
        directory: ""
    },

    reducers: {
        clearHistory: state => {
            state.history = []
        },
        addHistory: (state, action) => {
            state.history.push(action.payload);
        },
        addDirectory: (state, action) => {
            state.directory += ` ${action.payload}`;
        },
        removeDirectory: (state) => {
            state.directory = state.directory.substring(0, state.directory.lastIndexOf(' '));
        }
    }
})


export const { clearHistory, addHistory, addDirectory, removeDirectory } = terminalSlice.actions;
export default terminalSlice.reducer;
