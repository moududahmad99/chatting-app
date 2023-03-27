import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/UserSlice";

const reduxStore = configureStore({
    reducer: {
        loginSlice: userSlice
    }
})

export default reduxStore;