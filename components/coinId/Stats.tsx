import React from 'react'
import styled from 'styled-components'

interface StatsProps {
    name: string,
    symbol: string,
    price: number,
    market_cap: number,
    volume: number,
    low_24h: number
    high_24h: number,
    market_cap_rank: number,
    ath: number,
    ath_date: string,
    ath_change_percentage: number,
    atl: number,
    atl_date: string,
    atl_change_percentage: number,
    circulating_supply: number,
    total_supply?: null | number,
    max_supply?: null | number
    currency: string,
    full_valuation: number
}



function Stats({
    currency, name, symbol, price, market_cap, volume, low_24h, high_24h,
    market_cap_rank, ath, ath_date, ath_change_percentage, atl, atl_date,
    atl_change_percentage, circulating_supply, total_supply, max_supply, full_valuation
}: StatsProps) {
  return (
    <StyledStats className='Stats'>
        <h2 className='Stats-title'>Price Statistics</h2>
        <ul className="Stats-list">
            <li className='Stats-list-item'>
                <span className='Stats-list-item-description'>{name} price</span>
                <span className='Stats-list-item-stat'>{currency}{price}</span>
            </li>
            <li className='Stats-list-item'>
                <span className='Stats-list-item-description'>Market cap</span>
                <span className='Stats-list-item-stat'>{currency}{market_cap}</span>
            </li>
            {full_valuation ? 
                <li className='Stats-list-item'>
                    <span className='Stats-list-item-description'>Fully diluted valuation</span>
                    <span className='Stats-list-item-stat'>{currency}{full_valuation}</span>
                </li>
            : ''}
            <li className='Stats-list-item'>
                <span className='Stats-list-item-description'>Volume</span>
                <span className='Stats-list-item-stat'>{currency}{volume}</span>
            </li>
            <li className='Stats-list-item'>
                <span className='Stats-list-item-description'>24H low / 24H high</span>
                <span className='Stats-list-item-stat'>{currency}{low_24h} / {currency}{high_24h}</span>
            </li>
            <li className='Stats-list-item'>
                <span className='Stats-list-item-description'>Market cap rank</span>
                <span className='Stats-list-item-stat'>#{market_cap_rank}</span>
            </li>
            <li className='Stats-list-item-ath Stats-list-item'>
                <span className='Stats-list-item-description'>
                    All Time High
                </span>
                <div className="Stats-list-item-ath-flex">
                    <div className='Stats-list-item-ath-div'>
                        <span className='Stats-list-item-ath-stat'>{currency}{ath} </span>
                        <span className='Stats-list-item-ath-percentage'>{ath_change_percentage.toFixed(1)}%</span>
                    </div>
                    <span className='Stats-list-item-ath-date'>
                        {ath_date}
                    </span>
                </div>
            </li>
            <li className='Stats-list-item Stats-list-item-atl'>
                <span className='Stats-list-item-description'>
                    All Time Low
                </span>
                <div className="Stats-list-item-atl-flex">
                    <span className='Stats-list-item-atl-div'>
                        <span className='Stats-list-item-atl-stat'>{currency}{atl} </span>
                        <span className='Stats-list-item-atl-percentage'>+{atl_change_percentage.toFixed(1)}%</span>
                    </span>
                    <span className='Stats-list-item-atl-date'>
                        {atl_date}
                    </span>
                </div>
            </li>
            <li className='Stats-list-item'>
                <span className='Stats-list-item-description'>Circulating Supply</span>
                <span className='Stats-list-item-stat'>{circulating_supply?.toLocaleString()}</span>
            </li>
            {total_supply ? 
                <li className='Stats-list-item'>
                    <span className='Stats-list-item-description'>Total Supply</span>
                    <span className='Stats-list-item-stat'>{total_supply?.toLocaleString()}</span>
                </li>
            : ''}
            {max_supply ? 
                <li className='Stats-list-item'>
                    <span className='Stats-list-item-description'>Max Supply</span>
                    <span className='Stats-list-item-stat'>{max_supply?.toLocaleString()}</span>
                </li>
            : ''}
        </ul>
    </StyledStats>
  )
}

const StyledStats = styled.div`
    max-width: ${props => props.theme.breakpoint.zeta};
    .Stats {
        &-title {
            position: relative;
            font-size: ${props => props.theme.font.size.beta};
            font-weight: ${props => props.theme.font.weight.alpha};
            margin-bottom: ${props => props.theme.space.eta};
            &::after {
                position: absolute;
                content: '';
                height: 1px;
                width: 100%;
                background-color: ${props => props.theme.color.epsilon};
                bottom: -${props => props.theme.space.eta};
                left: 0;
            }
        }
        &-list {
            &-item {
                position: relative;
                height: ${props => props.theme.space.beta};
                display: flex;
                justify-content: space-between;
                align-items: center;
                &::after {
                    position: absolute;
                    content: '';
                    height: 1px;
                    width: 100%;
                    background-color: ${props => props.theme.color.epsilon};
                    bottom: 0;
                    left: 0;
                }
                &-ath, &-atl {
                    height: 4em;
                    &-flex {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                    }
                    &-stat {
                        font-weight: ${props => props.theme.font.weight.alpha};
                    }
                    &-date {
                        margin-top: ${props => props.theme.space.theta};
                        font-size: ${props => props.theme.font.size.delta};
                        font-weight: ${props => props.theme.font.weight.beta} !important;
                    }
                }
                &-ath-percentage {
                    color: ${props => props.theme.color.psi};
                }
                &-atl-percentage {
                    color: ${props => props.theme.color.omega};
                }
                
                &-description {
                    text-transform: capitalize;
                    font-weight: ${props => props.theme.font.weight.beta};
                    color: ${props => props.theme.color.delta};
                }
                &-stat {
                    font-weight: ${props => props.theme.font.weight.alpha};
                    color: ${props => props.theme.color.beta};
                }
                &-ath {

                }
            }
        }
    }
`

export default Stats