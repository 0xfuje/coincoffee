import React from 'react'
import styled from 'styled-components'

interface PriceProps {
    name: string,
    price: number,
    low_24h: number,
    high_24h: number,
    change_24h: number,
    btc: number,
    eth: number
}
interface StyledPriceProps {
    readonly isPriceChangePos: boolean
}


function Price({name, price, low_24h, high_24h, change_24h, btc, eth}: PriceProps) {
    const isPriceChangePos: boolean = (change_24h >= 0) ? true : false
    const change_24h_perc = (change_24h).toFixed(1)
    const change_24h_prefix = isPriceChangePos ? '+' : ''
    return (
        <StyledPrice className='Price' isPriceChangePos={isPriceChangePos}>
            <p className='Price-name'>{name} Price</p>
            <div className="Price-row">
                <div className="Price-price">
                    <h2 className="Price-price-current">${price}</h2>
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
                    <span className='Price-bar-price'>${low_24h}</span>
                </div>
                <div className="Price-bar-line"></div>
                <div className='Price-bar-high'>
                    <span className='Price-bar-text'>High:</span>
                    <span className='Price-bar-price'>${high_24h}</span>
                </div>    
            </div>
        </StyledPrice>
    )
}

const StyledPrice = styled.div<StyledPriceProps>`
    max-width: ${props => props.theme.breakpoint.theta};
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
            }
        }
        &-bar {
            display: flex;
            gap: ${props => props.theme.space.zeta};
            align-items: center;
            font-size: ${props => props.theme.font.size.delta};
            &-line {
                width: 200px;
                height: 5px;
                border-radius: ${props => props.theme.space.theta};
                background-color: ${props => props.theme.color.epsilon};
            }
            &-text {
                color: ${props => props.theme.color.delta};
            }
            &-price {
                color: ${props => props.theme.color.alpha};
            }
            &-high {

            }
            &-low {
                
            }
        }
    }
`

export default Price