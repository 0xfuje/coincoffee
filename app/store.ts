import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import pageSettingsReducer from "../features/page/pageSettingsSlice";

const store = configureStore({
    reducer: {
        pageSettings: pageSettingsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), apiSlice.middleware]
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;