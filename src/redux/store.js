import { configureStore } from "@reduxjs/toolkit";
import colorSlice from './slice'
import blogSlice from './blogSlice'
import notesBlog from './notesBlogSlice'
import imgBlog from './photoSlice'

const store = configureStore({
    reducer: {
        color: colorSlice,
        blogs: blogSlice,
        notes: notesBlog,
        images: imgBlog,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['blog/addBlog', 'blog/setInitialState'],
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                ignoredPaths: ['items.dates'],
            },
        }),
})

export default store