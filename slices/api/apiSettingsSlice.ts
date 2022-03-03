import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ListApiSettings, ListApiOrder, ListApiPriceChange, SupportedCurrencies } from "../../types";

const initialState: ListApiSettings = {
    currency: 'usd',
    order: 'market_cap_desc',
    pageNumber: 1,
    priceChange: '1y'
}

const apiSettingsSlice = createSlice({
    name: 'api-settings',
    initialState,
    reducers: {
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


/* const fetch_urls = {
    base: 'https://api.coingecko.com/api/v3',
    list: `/coins/markets?vs_currency=${currency}&order=${order}&per_page=100&page=${pageNumber}&sparkline=false&price_change_percentage=${priceChange}`,
    coin: `/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
    tickers: `/coins/${coin}/tickers?include_exchange_logo=true`,
    charts: `/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
} */


export const {
    jumpToPage,
    changeFullPageSettings,
    changeCurrency,
    changeOrder,
    changePriceChange
 } = apiSettingsSlice.actions
export default apiSettingsSlice.reducer;