import { combineReducers } from "@reduxjs/toolkit";

//Slices
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

export const rootReducer = combineReducers({auth: authSlice, user: userSlice})

