import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'


interface TickerProps {
    base: string,
    target: string,
    exchange: string,
    logo: string,
    volume: number,
    price: number,
    trade_url: string | null
}

function Ticker({base, target, exchange, logo, volume, price, trade_url}: TickerProps) {
    return (
        <StyledTicker className='Ticker'>
            <div className="Ticker-left">
                <Link href={trade_url!}>
                <a>
                    <Image 
                        className="Ticker-left-logo"
                        width="24px" height="24px"
                        src={logo}
                    />
                </a>
                </Link>
                <div className="Ticker-left-text">
                    <Link href={trade_url!}>
                        <a className="Ticker-left-ticker">{base.slice(0,7)}/{target.slice(0, 7)}</a>
                    </Link>
                    <div className="Ticker-left-exchange">{exchange}</div>
                </div>
            </div>
            <div className="Ticker-right">
                <div className="Ticker-right-volume">${volume}</div>    
                <div className="Ticker-right-price">${price}</div>    
            </div>
        </StyledTicker>
    )
}

const StyledTicker = styled.div`
    display: flex;
    justify-content: space-between;
    height: 4em;
    align-items: center;
    position: relative;
    // max-width: ${props => props.theme.breakpoint.epsilon};
    &:hover {
        background-color: ${props => props.theme.color.zeta};
    }
    &::after {
        position: absolute;
        content: '';
        height: 1px;
        width: 100%;
        background-color: ${props => props.theme.color.epsilon};
        bottom: 0;
        left: 0;
    }
    .Ticker {
        &-left {
            display: flex;
            align-items: center;
            gap: ${props => props.theme.space.eta};
            &-ticker {
                font-weight: ${props => props.theme.font.weight.alpha};
            }
            &-exchange {
                color: ${props => props.theme.color.delta};
            }
        }
        &-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            &-volume {
                font-weight: ${props => props.theme.font.weight.alpha};
            }
            &-price {
                color: ${props => props.theme.color.delta};
            }
        }
    }
    
`

export default Ticker