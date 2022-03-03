import { configureStore } from "@reduxjs/toolkit";
import apiSettingsReducer from "../slices/api/apiSettingsSlice";

const store = configureStore({
    reducer: {
        apiSettings: apiSettingsReducer,
    },
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;