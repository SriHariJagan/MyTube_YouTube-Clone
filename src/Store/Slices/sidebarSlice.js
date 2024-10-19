import { createSlice } from "@reduxjs/toolkit";

const initialState = { showSidebar : true, categorie: 0};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.showSidebar = ! state.showSidebar;
        },
        setCategorie: (state, action) => {
            state.categorie = action.payload;
        }
    }
})

export const { toggleSidebar, setCategorie } = sidebarSlice.actions;
export default sidebarSlice.reducer;

export const sidebarValues  = (state) => state.sidebar;