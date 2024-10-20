import { createSlice } from "@reduxjs/toolkit";

export const defaultState = [
    {
        type: "heading",
        content: "Untitled",
    },
    {
        type: "paragraph",
    },
];

const blogSlice = createSlice({
    name: "blog",
    initialState: { content: defaultState },
    reducers: {
        addBlog: (state, action) => {
            state.content = action.payload;
        },
        setInitialState: (state, action) => {
            state.content = action.payload
        },
        removeBlog: (state, action) => {
            state.content = state.content.filter(content => content.id !== action.payload);
        },
    },
});


export const { addBlog, removeBlog, setInitialState } = blogSlice.actions;
export default blogSlice.reducer;
