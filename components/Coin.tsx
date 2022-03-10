import React from 'react'
import styled from 'styled-components';
import { CoinProps } from '../types';
import Image from 'next/image'
import Link from 'next/link';
import { convertNum } from '../helpers';

function Coin(props: CoinProps) {
    const order = (props.order === 'market_cap_desc')
        ? props.market_cap
        : props.total_volume
    
    const priceChange = (props.price_change_percentage === '0.0') ? '-' : `${props.price_change_percentage}%`
    const priceChangeClass = () => {
        const priceChange = parseInt(props.price_change_percentage)
        if (priceChange > 0) return 'green';
        if (priceChange < 0) return 'red';
        if (priceChange === 0.0) return '';
    }
    return (
        <StyledCoin className='Coin'>
            <span className='Coin-rank'>{props.market_cap_rank}</span>
            <td className="Coin-identity">
            <Link href={`/coins/${props.id}`}>
                <a><Image className='Coin-identity-logo' src={props.image} width={'24px'} height={'24px'} /></a>
            </Link>
                <div className="Coin-identity-text">
                    <Link href={`/coins/${props.id}`}>
                        <a><span className='Coin-identity-name'>{props.name}</span></a>
                    </Link>
                    <span className='Coin-identity-symbol'>{props.symbol}</span>
                </div>
            </td>
            <td className="Coin-priceParent">
                <Link href={`/coins/${props.id}`}><a className='Coin-priceParent-price'>${props.current_price}</a></Link>
                <span className='Coin-priceParent-order'>${convertNum(order!)}</span>
            </td>
            <td className={`Coin-priceChange ${priceChangeClass()}`}>{priceChange}</td>
            <td className='Coin-order'>${convertNum(order!)}</td>
        </StyledCoin>
    )
}

const StyledCoin = styled.tr`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    align-items: center;
    position: relative;
    &:hover {
        background-color: ${props => props.theme.color.zeta};
    }
    @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
        grid-template-columns: 3fr 1fr 1fr 1fr;
    };
    &::after {
        position: absolute;
        content: '';
        height: 1px;
        width: 100%;
        background-color: ${props => props.theme.color.epsilon};
        bottom: 0;
    }
    .Coin {
        &-rank {
            position: absolute;
            top: 40%;
            font-size: ${props => props.theme.font.size.epsilon};
            color: ${props => props.theme.color.delta};
        }
        &-identity {
            margin-left: ${props => props.theme.space.delta};
            display: flex;
            align-items: center;
            position: relative;
        
            &-text {
                font-size: ${props => props.theme.font.size.gamma};
                margin-left: ${props => props.theme.space.eta};
                display: flex;
                flex-direction: column;
            }
            &-name {
                font-weight: ${props => props.theme.font.weight.alpha};
            }

          
            &-symbol {
                text-transform: uppercase;
                color: ${props => props.theme.color.delta};
            }
            &-logo {
                margin-left: ${props => props.theme.space.eta};
                width: 24px;
                height: 24px;
            }
        }

        &-priceParent {
            display: flex;
            flex-direction: column;
            @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                justify-self: right;
            };
            &-price {
                // font-weight: ${props => props.theme.font.weight.alpha};
            }
            &-order {
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    display: none;
                };
                
            }
        }

        &-priceChange {
            // font-weight: ${props => props.theme.font.weight.beta};;
        }

        &-order {
            display: none;
            // font-weight: ${props => props.theme.font.weight.alpha};
            @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                display: inline-block;
            };
        }

        &-priceChange, &-order {
            justify-self: right;
        }

    }

`

export default Coin;