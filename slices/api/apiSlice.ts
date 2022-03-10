import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { 
    ListApiSettings,
    ListApiResult,
    CoinApiResult,
    TickerApiResult,
    ChartApiResult,
    ChartApiSettings,
    GlobalAPIResult
 } from '../../types';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3'}),
    endpoints: (builder) => ({
        getGlobal: builder.query<GlobalAPIResult, void>({
            query: () => `/global`
        }),
        getList: builder.query<ListApiResult[], ListApiSettings>({
            query: (args) => {
                const {currency, order, pageNumber, priceChange} = args;
                return `/coins/markets?vs_currency=${currency}&order=${order}&per_page=100&page=${pageNumber}&sparkline=false&price_change_percentage=${priceChange}`
            }
        }),
        getCoin: builder.query<CoinApiResult, string>({
            query: (coin) => `/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
        }),
        getTickers: builder.query<TickerApiResult[], string>({
            query: (coin) => `/coins/${coin}/tickers?include_exchange_logo=true`
        }),
        getChart: builder.query<ChartApiResult[], ChartApiSettings>({
            query: (args) => {
                const {coin, currency, days} = args;
                return `/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
            }
        }),

    })
});

export default apiSlice;

export const {
    useGetGlobalQuery,
    useGetListQuery,
    useGetCoinQuery,
    useGetChartQuery,
    useGetTickersQuery,
} = apiSlice;