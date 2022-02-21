import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ListApiInput, ListApiOrder, ListApiPriceChange } from "../../types";

const initialState: ListApiInput = {
    currency: 'usd',
    order: 'market_cap_desc',
    pageNumber: 1,
    priceChange: '1y'
}

const pageSettingsSlice = createSlice({
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
    changeOrder,
    changePriceChange
 } = pageSettingsSlice.actions
export default pageSettingsSlice.reducer;