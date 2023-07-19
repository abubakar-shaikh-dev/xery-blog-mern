import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        setUser: (state, action) => action.payload,
        clearUser: () => null,
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;