import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListApiSettings, SupportedCurrencies, ListApiOrder, ListApiPriceChange, ApiSettings } from '../../types'

const initialState: ApiSettings = {
    currency: {
        name: 'usd',
        symbol: '$'
    },
    list: {
        pageNumber: 1,
        order: 'market_cap_desc',
        priceChange: '1y'
    },
}

const apiSettingsSlice = createSlice({
    name: 'api-settings',
    initialState,
    reducers: {
        changePageNumber(state, action: PayloadAction<number>) {
            state.list.pageNumber = action.payload
        },
        changeFullPageSettings(state, action: PayloadAction<ListApiSettings>) {
            state.list = action.payload
        },
        changeCurrency(state, action: PayloadAction<SupportedCurrencies>) {
            if (action.payload === 'usd') state.currency.symbol = '$'
            if (action.payload === 'eur') state.currency.symbol = '€'
            if (action.payload === 'cny') state.currency.symbol = '¥'        
            if (action.payload === 'jpy') state.currency.symbol = '¥'        
            if (action.payload === 'gbp') state.currency.symbol = '£'        
            if (action.payload === 'eth') state.currency.symbol = 'Ξ'
            if (action.payload === 'btc') state.currency.symbol = '₿'
            state.currency.name = action.payload;
        },
        changeOrder(state, action: PayloadAction<ListApiOrder>) {
            state.list.order = action.payload
            state.list.pageNumber = 1
        },
        changePriceChange(state, action: PayloadAction<ListApiPriceChange>) {
            state.list.priceChange = action.payload
        }
    }
})

export const {
    changePageNumber,
    changeFullPageSettings,
    changeCurrency,
    changeOrder,
    changePriceChange
} = apiSettingsSlice.actions

export default apiSettingsSlice