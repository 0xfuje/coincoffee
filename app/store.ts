import { configureStore } from "@reduxjs/toolkit";
import pageApiSettingsReducer from "../slices/api/pageApiSettingsSlice";

const store = configureStore({
    reducer: {
        pageSettings: pageApiSettingsReducer,
        
    },
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;