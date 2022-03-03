import React from 'react'
import { ListApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'

function CoinPage({ coinData }: any) {
    return (
        <>
        <h1>{coinData.name}</h1>
        <h2>Price: ${coinData.market_data.current_price.usd}</h2>
        <h2>Market Cap: ${coinData.market_data.market_cap.usd}</h2>
        </>
    )
}

export default CoinPage

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
    const data = await response.json();

    const paths = data.map((coin: ListApiResult) => {
        return {
            params: {
                coinId: `${coin.id}`
            }
        }
    })
    
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    const coin = params!.coinId
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
    const data = await response.json()

    return {
        props: {
            coinData: data
        }
    }
}