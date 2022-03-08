import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../slices/api/apiSlice";
import apiSettingsSlice from '../slices/api/apiSettingsSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        apiSettings: apiSettingsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;