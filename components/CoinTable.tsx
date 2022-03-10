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
            <thead className="CoinTable-header">
                <th className="CoinTable-header-asset">cryptoasset</th>
                <th className="CoinTable-header-price">price</th>
                <th className="CoinTable-header-priceChange">{priceChange}%</th>
                <th className="CoinTable-header-order">
                    {(order === 'market_cap_desc') ? 'market cap' : 'volume'}
                </th>
            </thead>
            <tbody className='CoinTable-body'>
            {renderCoins}
            </tbody>
        </StyledCoinTable>
    )
}

const StyledCoinTable = styled.table`
    display: block;
    width: 100%;
    .CoinTable {
        &-header {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            font-size: ${props => props.theme.font.size.epsilon};
            text-transform: uppercase;
            border-bottom: 1px solid ${props => props.theme.color.epsilon};
            margin: 0 auto;
            max-width: 1000px;
            @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                grid-template-columns: 3fr 1fr 1fr 1fr;
            };
            &-order {
                display: none;
                justify-self: right;
                
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    display: inline-block;
                };
            }
            &-priceChange {
                justify-self: right;
            }
            &-price {
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                justify-self: right;
            };
            }
        }

        &-body {
            display: grid;
            grid-auto-rows: 4em;
            margin: 0 auto;
            max-width: 1000px;
        }
    }
`

export default CoinTable