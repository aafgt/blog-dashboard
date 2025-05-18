import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../types";

interface AuthState {
    isAuthenticated: boolean;
    user: UserInterface | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserInterface>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;