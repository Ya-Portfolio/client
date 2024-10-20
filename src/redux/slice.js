import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    color: '#E7E8E7'
}

const initialSlice = createSlice({
    initialState,
    name: 'color',
    reducers: {
        toggle: (state) => {
            state.color = state.color === "#22303F" ? "#E7E8E7" : "#22303F"
        }
    }
})

export const { toggle } = initialSlice.actions
export default initialSlice.reducer