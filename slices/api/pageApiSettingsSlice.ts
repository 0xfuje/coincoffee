import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ListApiSettings, ListApiOrder, ListApiPriceChange, SupportedCurrencies } from "../../types";

const initialState: ListApiSettings = {
    currency: 'usd',
    order: 'market_cap_desc',
    pageNumber: 1,
    priceChange: '1y'
}

const pageApiSettingsSlice = createSlice({
    name: 'page-settings',
    initialState,
    reducers: {
        nextPage(state) {
            state.pageNumber++
        },
        previousPage(state) {
            state.pageNumber--
        },
        jumpToPage(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload
        },

        changeFullPageSettings(state, action: PayloadAction<ListApiSettings>) {
            state = action.payload
        },
        changeCurrency(state, action: PayloadAction<SupportedCurrencies>) {
            state.currency = action.payload
        },
        changeOrder(state, action: PayloadAction<ListApiOrder>) {
            state.order = action.payload
        },
        changePriceChange(state, action: PayloadAction<ListApiPriceChange>) {
            state.priceChange = action.payload
        }
    }
})

export const { 
    nextPage,
    previousPage,
    jumpToPage,
    changeFullPageSettings,
    changeCurrency,
    changeOrder,
    changePriceChange
 } = pageApiSettingsSlice.actions
export default pageApiSettingsSlice.reducer;