import { configureStore } from "@reduxjs/toolkit";

// slices
import sidebarSlice from './Slices/sidebarSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
    }
})

export default store;