import { createSlice } from "@reduxjs/toolkit";

export const defaultState = [

];


const imgSlice = createSlice({
    name: "images",
    initialState: { images: defaultState },
    reducers: {
        addImage: (state, action) => {
            const newData = {
                id: action.payload.id,
                url: action.payload.file
            }
            state.images.push(newData);
        },

        deleteImage: (state, action) => {
            state.images = state.images.filter(image => image.id === action.payload.id);
        },

    },
});


export const { addImage, deleteImage } = imgSlice.actions;
export default imgSlice.reducer;
