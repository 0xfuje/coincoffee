import React from 'react'
import styled from 'styled-components';
import { ListApiOrder, SupportedSymbols } from '../../types';
import Image from 'next/image'
import Link from 'next/link';
import { convertNum, convertColor } from '../../helpers';
export interface CoinProps {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap?:                      number;
    total_volume?:                    number;
    market_cap_rank:                  number;
    price_change_percentage:          number;
    order:                      ListApiOrder;
    currencySymbol:         SupportedSymbols;
}

function Coin(props: CoinProps) {
    const cs = props.currencySymbol
    const order = (props.order === 'market_cap_desc')
        ? props.market_cap
        : props.total_volume
    const priceChange = (props.price_change_percentage === 0) ? '-' : `${props.price_change_percentage.toFixed(1)}%`
    return (
        <StyledCoin className='Coin'>
            <span className='Coin-rank'>{props.market_cap_rank}</span>
            <div className="Coin-identity">
            <Link href={`/coins/${props.id}`}>
                <a><Image className='Coin-identity-logo' src={props.image} width={'24px'} height={'24px'} /></a>
            </Link>
                <div className="Coin-identity-text">
                    <Link href={`/coins/${props.id}`}>
                        <a><span className='Coin-identity-name'>{props.name}</span></a>
                    </Link>
                    <span className='Coin-identity-symbol'>{props.symbol}</span>
                </div>
            </div>
            <div className="Coin-priceParent">
                <Link href={`/coins/${props.id}`}><a className='Coin-priceParent-price'>{cs}{props.current_price}</a></Link>
                <span className='Coin-priceParent-order'>{cs}{convertNum(order!)}</span>
            </div>
            <div className={`Coin-priceChange Coin-priceChange-${convertColor(props.price_change_percentage)}`}>{priceChange}</div>
            <div className='Coin-order'>{cs}{convertNum(order!)}</div>
        </StyledCoin>
    )
}

const StyledCoin = styled.div`
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
                font-weight: ${props => props.theme.font.weight.alpha};
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    font-weight: ${props => props.theme.font.weight.beta};
                };
                
            }
            &-order {
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    display: none;
                };
                
            }
        }

        &-priceChange {
            &-green {
                color: ${props => props.theme.color.omega};
            }
            &-red {
                color: ${props => props.theme.color.psi};
            }
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