import React from 'react'
import styled from 'styled-components'

interface PriceProps {
    name: string,
    price: number,
    low_24h: number,
    high_24h: number,
    change_24h: number,
    btc: number,
    eth: number,
    currency: string,
}
interface StyledPriceProps {
    readonly isPriceChangePos: boolean
    readonly barPercentage: number
}


function Price({name, price, low_24h, high_24h, change_24h, btc, eth, currency}: PriceProps) {
    const isPriceChangePos: boolean = (change_24h >= 0) ? true : false
    const change_24h_perc = (change_24h).toFixed(1)
    const change_24h_prefix = isPriceChangePos ? '+' : ''
    const barPercentage = (low_24h / high_24h)
    return (
        <StyledPrice className='Price' isPriceChangePos={isPriceChangePos} barPercentage={barPercentage}>
            <p className='Price-name'>{name} Price</p>
            <div className="Price-row">
                <div className="Price-price">
                    <h2 className="Price-price-current">{currency}{price}</h2>
                    <span className='Price-price-change'>{change_24h_prefix}{change_24h_perc}%</span>
                </div>
                <div className="Price-crypto">
                    <span className="Price-crypto-btc">{btc} BTC</span>
                    <span className="Price-crypto-eth">{eth} ETH</span>
                </div>
            </div>
         
            
            <div className="Price-bar">
                <div className='Price-bar-low'>
                    <span className='Price-bar-text'>Low:</span>
                    <span className='Price-bar-price'>{currency}{low_24h}</span>
                </div>
                <div className="Price-bar-line">
                    <div className="Price-bar-line-progress"/>
                    <div className="Price-bar-line-arrow"/>
                </div>
                <div className='Price-bar-high'>
                    <span className='Price-bar-text'>High:</span>
                    <span className='Price-bar-price'>{currency}{high_24h}</span>
                </div>    
            </div>
        </StyledPrice>
    )
}

const StyledPrice = styled.div<StyledPriceProps>`
    max-width: 300px;
    @media screen and (min-width: ${props => props.theme.breakpoint.eta}) {
        max-width: ${props => props.theme.breakpoint.eta};
    }
    .Price {
        &-name {
            color: ${props => props.theme.color.delta};
            font-size: ${props => props.theme.font.size.delta};
        }
        &-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: ${props => props.theme.space.theta};
        }
        &-price {
            display: flex;
            gap: ${props => props.theme.space.zeta};
            align-items: center;
            &-current {
                font-size: ${props => props.theme.font.size.alpha};
                font-weight: ${props => props.theme.font.weight.alpha};
            }
            &-change {
                font-size: ${props => props.theme.font.size.delta};
                font-weight: ${props => props.theme.font.weight.alpha};
                color: ${props => props.theme.color.eta};
                padding: ${props => props.theme.space.theta};
                background-color: ${props => props.isPriceChangePos 
                ? props => props.theme.color.omega
                : props => props.theme.color.psi};
                border-radius: ${props => props.theme.space.iota};
            }
        }
        &-crypto {
            font-size: ${props => props.theme.font.size.delta};
            color: ${props => props.theme.color.delta};
            span {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
        }
        &-bar {
            display: flex;
            gap: ${props => props.theme.space.zeta};
            align-items: center;
            font-size: ${props => props.theme.font.size.delta};
            
            &-line {
                position: relative;
                width: 200px;
                height: 6px;
                border-radius: ${props => props.theme.space.epsilon};
                background-color: ${props => props.theme.color.epsilon};
                &-progress {
                    display: block;
                    height: 100%;
                    width: ${props => (props.barPercentage * 100) + '%'};
                    border-radius: ${props => props.theme.space.epsilon};
                    background-image: linear-gradient(to left, #7F6F68, #D1C9C7);
                }
            }
            &-text {
                color: ${props => props.theme.color.delta};
            }
            &-price {
                color: ${props => props.theme.color.alpha};
            }
            &-high, &-low {
                display: block;
                span {
                    display: inline;
                }
            }
        }
    }
`

export default Price