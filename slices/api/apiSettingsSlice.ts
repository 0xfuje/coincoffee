import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
    ApiSettings,
    SupportedCurrencies
 } from "../../types";



const initialState: ApiSettings = {
    coin: '',
    charts: {
        currency: 'usd',
        days: 60
    }
}

const apiSettingsSlice = createSlice({
    name: 'api-settings',
    initialState,
    reducers: {
        // Change Coin Api Settings
        changeCoinApi(state, action: PayloadAction<string>) {
            state.coin = action.payload
        },

        // Change Chart Api Settings
        changeChartApiCurrency(state, action: PayloadAction<SupportedCurrencies>) {
            state.charts.currency = action.payload
        },
        changeChartApiDays(state, action: PayloadAction<number>) {
            state.charts.days = action.payload
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


export default apiSettingsSlice.reducer