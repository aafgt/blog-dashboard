import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        posts: []
    },
    reducers: {
        addPosts(state, action) {
            state.posts = action.payload;
        }
    }
});

export const blogActions = blogSlice.actions;

export default blogSlice;