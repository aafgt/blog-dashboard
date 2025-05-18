import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blog-slice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer: {
        blog: blogSlice.reducer,
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;