import React from 'react'
import styled from 'styled-components'

interface CoinIdProps {
    name: string,
    price: number,
    low_24h: number,
    high_24h: number,
    change_24h: number,
    btc: number,
    eth: number
}
interface StyledCoinIdProps {
    readonly isPriceChangePos: boolean
}



function CoinId({name, price, low_24h, high_24h, change_24h, btc, eth}: CoinIdProps) {
    const isPriceChangePos: boolean = (change_24h >= 0) ? true : false
    const change_24h_perc = (change_24h).toFixed(1)
    const change_24h_prefix = isPriceChangePos ? '+' : ''
    return (
        <StyledCoinId className='CoinId' isPriceChangePos={isPriceChangePos}>
            <p className='CoinId-name'>{name} Price</p>
            <div className="CoinId-row">
                <div className="CoinId-price">
                    <h2 className="CoinId-price-current">${price}</h2>
                    <span className='CoinId-price-change'>{change_24h_prefix}{change_24h_perc}%</span>
                </div>
                <div className="CoinId-crypto">
                    <span className="CoinId-crypto-btc">{btc} BTC</span>
                    <span className="CoinId-crypto-eth">{eth} ETH</span>
                </div>
            </div>
         
            
            <div className="CoinId-bar">
                <div className='CoinId-bar-low'>
                    <span className='CoinId-bar-text'>Low:</span>
                    <span className='CoinId-bar-price'>${low_24h}</span>
                </div>
                <div className="CoinId-bar-line"></div>
                <div className='CoinId-bar-high'>
                    <span className='CoinId-bar-text'>High:</span>
                    <span className='CoinId-bar-price'>${high_24h}</span>
                </div>    
            </div>
        </StyledCoinId>
    )
}

const StyledCoinId = styled.div<StyledCoinIdProps>`
    .CoinId {
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

export default CoinId