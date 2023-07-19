import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./reducers"
import { persistStore, persistReducer,FLUSH,REHYDRATE,REGISTER,PURGE,PAUSE,PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:"persist-key",
    storage
}

const persistRootReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistRootReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH,REHYDRATE,REGISTER,PURGE,PAUSE,PERSIST]
        }
    })}
})

export const PersistedStore = persistStore(store);