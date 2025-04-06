import { createSlice } from '@reduxjs/toolkit'

export const terminalSlice = createSlice({
    name: 'terminal',
    initialState: {
        history: []
    },

    reducers: {
        clearHistory: state => {
            state.history = []
        },
        addHistory: (state, action) => {
            state.history.push(action.payload);
        },
    }
})


export const { clearHistory, addHistory } = terminalSlice.actions;
export default terminalSlice.reducer;
