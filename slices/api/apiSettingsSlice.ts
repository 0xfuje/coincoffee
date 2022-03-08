import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListApiSettings, SupportedCurrencies, ListApiOrder, ListApiPriceChange, ApiSettings } from '../../types'

const initialState: ApiSettings = {
    list: {
        pageNumber: 1,
        currency: 'usd',
        order: 'market_cap_desc',
        priceChange: '1y'
    }
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
            state.list.currency = action.payload
        },
        changeOrder(state, action: PayloadAction<ListApiOrder>) {
            state.list.order = action.payload
        },
        changePriceChange(state, action: PayloadAction<ListApiPriceChange>) {
            state.list.priceChange = action.payload
        }
    }
})

export const {
    jumpToPage,
    changeFullPageSettings,
    changeCurrency,
    changeOrder,
    changePriceChange
} = apiSettingsSlice.actions

export default apiSettingsSlice