import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"Login",
    initialState: {
        login: null
    },
    reducers: {
        loginUser: (state, action) => {
            state.login = action.payload
        }
    }
})

export const {loginUser} = userSlice.actions;

export default userSlice.reducer;