import React from 'react'
import styled from 'styled-components'

interface SmallStatsProps {
    symbol: string,
    market_cap: number,
    volume: number,
    currency: string
}

function SmallStats({symbol, market_cap, volume, currency}: SmallStatsProps) {
    return (
        <StyledSmallStats className='SmallStats'>
            <div className="SmallStats-row SmallStats-row-marketCap">
                <div className="SmallStats-row-title">
                    {symbol.toUpperCase()} Market-cap
                </div>
                <div className="SmallStats-row-number">
                    {currency}{market_cap.toLocaleString()}
                </div>
            </div>
            <div className="SmallStats-row SmallStats-row-volume">
                <div className="SmallStats-row-title">
                    {symbol.toUpperCase()} Volume 24H
                </div>
                <div className="SmallStats-row-number">
                    {currency}{volume.toLocaleString()}
                </div>
            </div>
            <div className="SmallStats-row SmallStats-row-volume">
                <div className="SmallStats-row-title">
                    {symbol.toUpperCase()} Market-cap / Volume ratio
                </div>
                <div className="SmallStats-row-number">
                    {(volume / market_cap).toFixed(5)}
                </div>
            </div>
        </StyledSmallStats>
    )
}

const StyledSmallStats = styled.div`
    .SmallStats {
        &-row {
            width: ${props => props.theme.breakpoint.theta};
            position: relative;
            margin-bottom: ${props => props.theme.space.epsilon};
            &:after {
                position: absolute;
                content: '';
                height: 1px;
                width: 100% !important;
                background-color: ${props => props.theme.color.epsilon};
                bottom: -${props => props.theme.space.theta};
                left: 0;
            }
            &-title {
                font-size: ${props => props.theme.font.size.delta};
                color: ${props => props.theme.color.delta};
            }
            &-number {
                font-size: ${props => props.theme.font.size.beta};
                font-weight: ${props => props.theme.font.weight.alpha};
                color: ${props => props.theme.color.beta};
            }
        }
    }
`


export default SmallStats