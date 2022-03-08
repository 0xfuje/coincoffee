import React from 'react'
import styled from 'styled-components';
import { CoinProps } from '../types';
import Image from 'next/image'
import Link from 'next/link';

function Coin(props: CoinProps) {
    const order = (props.order === 'market_cap_desc')
        ?   props.market_cap
        :   props.total_volume
    return (
        <StyledCoin className='Coin'>
                <td className="Coin-identity">
                    <Link href={`/coins/${props.id}`}>
                        <a>
                            <span className='Coin-identity-rank'>{props.market_cap_rank}</span>
                            <Image className='Coin-identity-logo' src={props.image} width={'24px'} height={'24px'}/>
                            <span className='Coin-identity-name'>{props.name}</span>
                            <span className='Coin-identity-symbol'>{props.symbol}</span>
                        </a>
                    </Link>
                </td>
                <td className="Coin-price">{props.current_price}</td>
                <td className="Coin-priceChange">{props.price_change_percentage}%</td>
                <td className="Coin-marketCap">{order}</td>
        </StyledCoin>
    )
    }

const StyledCoin = styled.tr`
    

`

export default Coin;