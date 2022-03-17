import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import styled from 'styled-components'
import { TickerApiResult } from '../../types'
import Ticker from './Ticker'


interface MarketsProps {
    name: string,
    tickers: TickerApiResult
}

function Markets({name, tickers}: MarketsProps) {
    const [areAllTickersShowed, setAreAllTickersShowed] = useState<boolean>(false);

    const render5Tickers = tickers.tickers.slice(0, 5).map((t) => {
        return <Ticker
            key={nanoid()}
            base={t.base}
            target={t.target}
            exchange={t.market.name}
            logo={t.market.logo}
            volume={t.converted_volume.usd}
            price={t.last}
            trade_url={t.trade_url}
        />
    })
    
    return (
        <StyledMarkets className='Markets'>
            <div className="Markets-header">
                <h2 className="Markets-header-title">{name} Markets</h2>
                <div className="Markets-header-flex">
                    <span className="Markets-header-market">Market</span>
                    <span className="Markets-header-volume">24h Volume</span>
                </div>
            </div>
            {render5Tickers}
            <button>Show All</button>
        </StyledMarkets>
    )
}

const StyledMarkets = styled.div`
    max-width: ${props => props.theme.breakpoint.zeta};
    .Markets {
        &-header {
            &-title {
                font-size: ${props => props.theme.font.size.beta};
                font-weight: ${props => props.theme.font.weight.alpha};
                margin-bottom: ${props => props.theme.space.eta};
            }
            &-flex {
                display: flex;
                justify-content: space-between;
                font-size: ${props => props.theme.font.size.delta};
                text-transform: uppercase;
                padding-bottom: 3px;
                border-bottom: 1px solid ${props => props.theme.color.epsilon};
            }
            
          
        }
    }
`

export default Markets