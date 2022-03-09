import React from 'react'
import styled from 'styled-components';
import { CoinProps } from '../types';
import Image from 'next/image'
import Link from 'next/link';

function Coin(props: CoinProps) {
    const order = (props.order === 'market_cap_desc')
        ?   props.market_cap
        :   props.total_volume
    const convertNum = (num: number) => {
        const billion = 1000000000
        const million = 1000000
        if (num > billion) return `${(num / billion).toFixed(2)}B`
        if (num > million) return `${(num / million).toFixed(2)}M`
    }
    return (
        <StyledCoin className='Coin'>
                <td className="Coin-identity">
                    <Link href={`/coins/${props.id}`}>
                        <a>
                            <span className='Coin-identity-rank'>{props.market_cap_rank}</span>
                            <Image className='Coin-identity-logo' src={props.image} width={'24px'} height={'24px'}/>
                            <div className="Coin-identity-text">
                                <span className='Coin-identity-name'>{props.name}</span>
                                <span className='Coin-identity-symbol'>{props.symbol}</span>
                            </div>
                        </a>
                    </Link>
                </td>
                <td className="Coin-priceParent">
                    <span className='Coin-priceParent-price'>${props.current_price}</span>
                    <span className='Coin-priceParent-marketCap'>${convertNum(props.market_cap!)}</span>
                </td>
                <td className={"Coin-priceChange"}>{props.price_change_percentage}%</td>
                <td className={(props.order) === 'market_cap_desc' ? 'Coin-marketCap' : 'Coin-volume'}>
                    ${convertNum(order!)}
                </td>
        </StyledCoin>
    )
    }

const StyledCoin = styled.tr`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    align-items: center;
    position: relative;
    &::after {
        position: absolute;
        content: '';
        height: 1px;
        width: 100%;
        background-color: ${props => props.theme.color.epsilon};
        bottom: 0;
    }
    .Coin {
        
        &-identity {
            a {
                display: flex;
                align-items: center;
                gap: ${props => props.theme.space.eta};
            }
            &-text {
                display: flex;
                flex-direction: column;
            }
            &-name {
                font-weight: ${props => props.theme.font.weight.alpha};
            }
            &-rank {
                font-size: ${props => props.theme.font.size.epsilon};
                color: ${props => props.theme.color.delta};
            }
            &-symbol {
                text-transform: uppercase;
                color: ${props => props.theme.color.delta};
            }
        }

        &-priceParent {
            display: flex;
            flex-direction: column;
            &-price {
                font-weight: ${props => props.theme.font.weight.alpha};
            }
        }


        &-marketCap, &-volume {
            display: none;
        }

        &-priceChange, &-marketCap, &-volume {
            text-align: right;
        }

    }

`

export default Coin;