import type { NextPage } from 'next'
import Head from 'next/head'
import { RootState } from '../app/store'
import styled from 'styled-components'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Coin from '../components/Coin'

const Home: NextPage = () => {
    const pageSettings = useAppSelector((state: RootState) => state.pageSettings)
 
    /* const renderCoins = coins?.map((c) => {
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
                price_change_percentage={priceChange()}                
            />
        })  */
    
    
    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className='Home-title'>CoinCoffee ☕</h1>
            
        </StyledHome>
    )
}

const StyledHome = styled.div`
    
`

export default Home;
