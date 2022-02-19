import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3'}),
    endpoints: (builder) => ({
        getList: builder.query({
            query: (args) => {
                const {currency, order, pageNum, priceChange} = args;
                return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=100&page=${pageNum}&sparkline=false&price_change_percentage=${priceChange}`
            }
        })
    })
})

export const {
    useGetListQuery
} = apiSlice