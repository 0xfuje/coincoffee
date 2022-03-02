import type { NextPage } from 'next'
import Head from 'next/head'
import { RootState } from '../app/store'
import { useAppSelector } from '../app/hooks'
import styled from 'styled-components'
import { GetStaticProps, GetStaticPaths } from 'next'
import Coin from '../components/Coin'
import { nanoid } from '@reduxjs/toolkit'
import PageNav from '../components/PageNav'

const Home: NextPage = ({ coins }: any) => {
    const pageSettings = useAppSelector((state: RootState) => state.pageSettings)
    const { currency, order, pageNumber, priceChange } = pageSettings; 

    const renderCoins = coins?.map((c) => {
            const priceChange = () => {
                if (c.price_change_percentage_1y_in_currency) return c.price_change_percentage_1y_in_currency;
                if (c.price_change_percentage_200d_in_currency) return c.price_change_percentage_200d_in_currency;
                if (c.price_change_percentage_30d_in_currency) return c.price_change_percentage_30d_in_currency;
                if (c.price_change_percentage_14d_in_currency) return c.price_change_percentage_14d_in_currency;
                if (c.price_change_percentage_7d_in_currency) return c.price_change_percentage_7d_in_currency;
                if (c.price_change_percentage_24h_in_currency) return c.price_change_percentage_24h_in_currency;
                if (c.price_change_percentage_1h_in_currency) return c.price_change_percentage_1h_in_currency;
                return 0;
            }
            return <Coin 
                key={nanoid()}
                id={c.id} 
                symbol={c.symbol} 
                name={c.name} 
                image={c.image} 
                current_price={c.current_price} 
                market_cap={c.market_cap} 
                market_cap_rank={c.market_cap_rank}
                price_change_percentage={priceChange().toFixed(1)}                
            />
        }) 
    
    
    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className='Home-title'>CoinCoffee ☕</h1>
            <div className="Home-list">
                <div className="Home-list-asset">cryptoasset</div>
                <div className="Home-list-price">price</div>
                <div className="Home-list-priceChange">{priceChange}%</div>
                <div className="Home-list-marketCap">market cap</div>
            </div>
            {renderCoins}
            <PageNav />
        </StyledHome>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pageSettings = useAppSelector((state: RootState) => state.pageSettings)
    const { currency, order, pageNumber, priceChange } = pageSettings; 
  
    return {
        paths: {
            params: {
                currency,
                order,
                pageNumber,
                priceChange
            },
        },
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ( context ) => {
    const { params } = context;
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1y`)
    const data = await response.json()

    return {
        props: {
            coins: data
        }
    }
}

const StyledHome = styled.div`
    
`

export default Home;
