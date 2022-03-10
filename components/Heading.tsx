import React from 'react'
import styled from 'styled-components'
import { useGetGlobalQuery } from '../slices/api/apiSlice'
import { convertNum } from '../helpers'
interface HeadingProps {
    readonly isSubTitleDisplayed: boolean
}

function Heading({isSubTitleDisplayed}: HeadingProps) {

    const {
        data: global,
        isFetching,
        isSuccess,
    } = useGetGlobalQuery();
    console.log(global?.data)
    const marketCap = convertNum(global?.data.total_market_cap.usd!)
    const volume = convertNum(global?.data.total_volume.usd!)

    return (
        <StyledHeading className="Heading" isSubTitleDisplayed={isSubTitleDisplayed}>
            <div className="Heading-stats">
                <div className="Heading-stats-coins">
                   <span className='Heading-stats-title'>Coins: </span>
                    <a className='Heading-stats-link'>{global?.data.active_cryptocurrencies}</a>
                </div>
                <div className="Heading-stats-exchanges">
                    <span className='Heading-stats-title'>Exchanges: </span>
                    <a className='Heading-stats-link'>{global?.data.markets}</a>
                </div>
                <div className="Heading-stats-marketCap">
                    <span className='Heading-stats-title'>Market Cap: </span>
                    <a className='Heading-stats-link'>${marketCap}</a>
                </div>
                <div className="Heading-stats-volume">
                    <span className='Heading-stats-title'>Volume: </span>
                    <a className='Heading-stats-link'>${volume}</a>
                </div>
                <div className='Heading-stats-dominance'>
                    <span className='Heading-stats-title'>Dominance: </span>
                    <span className='Heading-stats-title'>BTC </span>
                    <a className='Heading-stats-link'>{global?.data.market_cap_percentage.btc.toFixed(1)}%&nbsp;&nbsp;</a>
                    <span className='Heading-stats-title'>ETH </span>
                    <a className='Heading-stats-link'>{global?.data.market_cap_percentage.eth.toFixed(1)}%</a>
                </div>
            </div>
            <h1 className='Heading-title'>CoinCoffee ☕</h1>
            <p className="Heading-subtitle">Your daily dose of crypto caffeine, served in a delicious coffee</p>
            <hr className="Heading-line" />
        </StyledHeading>
  )
}

const StyledHeading = styled.div<HeadingProps>`
    .Heading {
        &-stats {
            display: none;
            gap: ${props => props.theme.space.delta};
            margin: ${props => props.theme.space.zeta};
            font-size: ${props => props.theme.font.size.delta};
            @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                display: flex;
            }
            &-title {
                color: ${props => props.theme.color.gamma};
            }
            &-link {
                color: ${props => props.theme.color.alpha};
            }
        }
        &-title {
            width: 100vw;
            font-size: ${props => props.theme.font.size.beta};
            text-align: center;
            margin-top: ${props => props.theme.space.epsilon};
            margin-bottom: ${props => props.theme.space.gamma};
            position: relative;
            &:before {
                display: none;
                position: absolute;
                content: '';
                height: 1px;
                width: 100vw !important;
                background-color: ${props => props.theme.color.epsilon};
                top: -${props => props.theme.space.zeta};
                left: 0;
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    display: inline-block;
                }
            }
            &:after {
                position: absolute;
                content: '';
                height: 1px;
                width: 100vw !important;
                background-color: ${props => props.theme.color.epsilon};
                bottom: -${props => props.theme.space.epsilon};
                left: 0;
            }
        }
        &-subtitle {
            display: ${props => (props.isSubTitleDisplayed) ? 'block' : 'none'};
            text-align: center;
            margin: 0 ${props => props.theme.space.beta} ${props => props.theme.space.epsilon};

        }
        &-line {

        }
    }
`

export default Heading;


