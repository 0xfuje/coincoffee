import React from 'react'
import Link from 'next/link';
import styled from 'styled-components';
import { CoinProps } from '../types';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Image from 'next/image'

function Coin(props: CoinProps) {
    const apiSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency, order, pageNumber, priceChange } = apiSettings; 
    return (
        <StyledCoin className='Coin'>
            <div className="Coin-identity">
                <span className='Coin-identity-rank'>#{props.market_cap_rank}</span>
                <Image className='Coin-identity-logo' src={props.image} width={'24px'} height={'24px'}/>
                <span className='Coin-identity-name'>{props.name}</span>
                <span className='Coin-identity-symbol'>{props.symbol}</span>
            </div>
            <div className="Coin-price">{props.current_price}</div>
            <div className="Coin-priceChange">{props.price_change_percentage}%</div>
            <div className="Coin-marketCap">{props.market_cap}</div>
        </StyledCoin>
    )
    }

const StyledCoin = styled.div`
    

`

export default Coin;