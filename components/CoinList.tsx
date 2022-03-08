import React from 'react'
import Coin from './Coin';
import { nanoid } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { ListApiResult } from '../types';

function CoinList({ coins }: any) {
    const renderCoins = coins?.map((c: ListApiResult) => {
            const priceChange = () => {
                // Fix later
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
        <StyledCoinList className='CoinList'>
        {renderCoins}
        </StyledCoinList>
    )
}

const StyledCoinList = styled.div`
    
`

export default CoinList