import React from 'react'
import Coin from './Coin';
import { nanoid } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { ListApiPriceChange, ListApiResult } from '../types';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store'

interface CoinTableProps {
    coins: ListApiResult[] | undefined,
    priceChange: ListApiPriceChange
}

function CoinTable({ coins, priceChange }: CoinTableProps) {

    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { order } = pageSettings.list;
    

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
                total_volume={c.total_volume}
                market_cap_rank={c.market_cap_rank}
                price_change_percentage={priceChange().toFixed(1)}
                order={order}               
            />
        }) 
    return (
        <StyledCoinTable className='CoinTable'>
            <tr className="CoinTable-header">
                <th className="CoinTable-header-asset">cryptoasset</th>
                <th className="CoinTable-header-price">price</th>
                <th className="CoinTable-header-priceChange">{priceChange}%</th>
                <th className="CoinTable-header-order">
                    {(order === 'market_cap_desc') ? 'market cap' : 'volume'}
                </th>
            </tr>
            {renderCoins}
        </StyledCoinTable>
    )
}

const StyledCoinTable = styled.table`
    .CoinTable {
        &-header {
            font-size: ${props => props.theme.font.size.epsilon};
            text-transform: uppercase;
            border-bottom: 1px solid ${props => props.theme.color.epsilon};
        }
    }
`

export default CoinTable