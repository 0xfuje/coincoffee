import React from 'react'
import styled from 'styled-components'
import { useGetGlobalQuery } from '../../slices/api/apiSlice'
import { convertNum } from '../../helpers'
import Link from 'next/link'
import { globalPagePadding } from '../../styles/GlobalStyle'

interface PageHeaderProps {
    readonly isSubTitleDisplayed: boolean
}

function PageHeader({isSubTitleDisplayed}: PageHeaderProps) {

    const {
        data: global,
        isFetching,
        isSuccess,
    } = useGetGlobalQuery();
    const marketCap = convertNum(global?.data.total_market_cap.usd!)
    const volume = convertNum(global?.data.total_volume.usd!)

    return (
        <StyledPageHeader className="PageHeader" isSubTitleDisplayed={isSubTitleDisplayed}>
            <div className="PageHeader-stats">
                <div className="PageHeader-stats-coins">
                   <span className='PageHeader-stats-title'>Coins: </span>
                    <a className='PageHeader-stats-link'>{global?.data.active_cryptocurrencies}</a>
                </div>
                <div className="PageHeader-stats-exchanges">
                    <span className='PageHeader-stats-title'>Exchanges: </span>
                    <a className='PageHeader-stats-link'>{global?.data.markets}</a>
                </div>
                <div className="PageHeader-stats-marketCap">
                    <span className='PageHeader-stats-title'>Market Cap: </span>
                    <a className='PageHeader-stats-link'>${marketCap}</a>
                </div>
                <div className="PageHeader-stats-volume">
                    <span className='PageHeader-stats-title'>Volume: </span>
                    <a className='PageHeader-stats-link'>${volume}</a>
                </div>
                <div className='PageHeader-stats-dominance'>
                    <span className='PageHeader-stats-title'>Dominance: </span>
                    <span className='PageHeader-stats-title'>BTC </span>
                    <a className='PageHeader-stats-link'>{global?.data.market_cap_percentage.btc.toFixed(1)}%&nbsp;&nbsp;</a>
                    <span className='PageHeader-stats-title'>ETH </span>
                    <a className='PageHeader-stats-link'>{global?.data.market_cap_percentage.eth.toFixed(1)}%</a>
                </div>
            </div>
            <Link href='/'><a><h1 className='PageHeader-title'>CoinCoffee ☕</h1></a></Link>
            <p className="PageHeader-subtitle">Your daily dose of crypto caffeine, served in a delicious coffee</p>
            <hr className="PageHeader-line" />
        </StyledPageHeader>
  )
}

const StyledPageHeader = styled.header<PageHeaderProps>`
    .PageHeader {
        &-stats {
            max-width: ${props => props.theme.max_width};
            display: none;
            gap: ${props => props.theme.space.delta};
            margin: ${props => props.theme.space.zeta} auto;
            ${globalPagePadding};
            padding-left: ${props => props.theme.space.zeta};
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

export default PageHeader;


