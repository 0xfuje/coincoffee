import React, { useState } from 'react'
import { ListApiResult, TickerApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'
import Heading from '../../../components/Heading'
import { CoinApiResult } from '../../../types'
import styled from 'styled-components'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import {Price, Header, Description, Stats, Performance, Links, Chart, SmallStats} from '../../../components/coinId'
import Markets from '../../../components/coinId/Markets'

interface CoinIdPageProps {
    coin: CoinApiResult,
    tickers: TickerApiResult
}

type ActiveTab = 'chart' | 'markets' | 'stats' | 'description';



function CoinIdPage({ coin, tickers }: CoinIdPageProps) {
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings;
    const currencyName = currency.name
    const [activeTab, setActiveTab] = useState<ActiveTab>('chart')
    
    const coinIdComponents = {
        Header: <Header 
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.image.large}
            market_cap_rank={coin.market_cap_rank}
        />,
        SmallStats: <SmallStats
            symbol={coin.symbol}
            market_cap={coin.market_data.market_cap[currencyName]}
            volume={coin.market_data.total_volume[currencyName]}
            currency={currency.symbol}
        />,
        Stats: <Stats
            name={coin.name}
            symbol={coin.symbol}
            price={coin.market_data.current_price[currencyName]}
            market_cap={coin.market_data.market_cap[currencyName]}
            volume={coin.market_data.total_volume[currencyName]}
            low_24h={coin.market_data.low_24h[currencyName]}
            high_24h={coin.market_data.high_24h[currencyName]}
            market_cap_rank={coin.market_cap_rank}
            ath={coin.market_data.ath[currencyName]}
            ath_change_percentage={coin.market_data.ath_change_percentage[currencyName]}
            ath_date={coin.market_data.ath_date[currencyName].slice(0, -14)}
            atl={coin.market_data.atl[currencyName]}
            atl_change_percentage={coin.market_data.atl_change_percentage[currencyName]}
            atl_date={coin.market_data.atl_date[currencyName].slice(0, -14)}
            total_supply={coin.market_data.total_supply}
            max_supply={coin.market_data.max_supply}
            circulating_supply={coin.market_data.circulating_supply}
            full_valuation={coin.market_data.fully_diluted_valuation[currencyName]}
            currency={currency.symbol}
        />,
        
        Price: <Price
            name={coin.name}
            price={coin.market_data.current_price[currencyName]}
            low_24h={coin.market_data.low_24h[currencyName]}
            high_24h={coin.market_data.high_24h[currencyName]}
            change_24h={coin.market_data.price_change_percentage_24h}
            btc={coin.market_data.current_price.btc}
            eth={coin.market_data.current_price.eth}
            currency={currency.symbol}
        />,
        Markets: <Markets name={coin.name} tickers={tickers} />,
        Description: <Description name={coin.name} text={coin.description.en}/>,
        Perfomance: <Performance
            p_24h={coin.market_data.price_change_percentage_24h} 
            p_7d={coin.market_data.price_change_percentage_7d} 
            p_30d={coin.market_data.price_change_percentage_30d} 
            p_60d={coin.market_data.price_change_percentage_60d} 
            p_200d={coin.market_data.price_change_percentage_200d} 
            p_1y={coin.market_data.price_change_percentage_1y} 
        />,
        Links: <Links
            homepage={coin.links.homepage[0]}
            forum={coin.links.official_forum_url[0]}
            explorer={coin.links.blockchain_site[0]}
            twitter={coin.links.twitter_screen_name}
            facebook={coin.links.facebook_username}
            telegram={coin.links.telegram_channel_identifier}
            reddit={coin.links.subreddit_url}
            github={coin.links.repos_url.github[0]}
        />,
        Chart: <Chart
            symbol={coin.symbol}
            id={coin.id}
        />
    }
    return (
        <StyledCoinIdPage>
            <Heading isSubTitleDisplayed={false}/>
            <div className="CoinIdPage">
                <div className="CoinIdPage-upper">
                    <div className="CoinIdPage-upper-left">
                        {coinIdComponents.Header}
                        {coinIdComponents.Links}
                        {coinIdComponents.Price}
                    </div>
                    <div className="CoinIdPage-upper-right">
                        {coinIdComponents.SmallStats}
                    </div>
                </div>
                <div className="CoinIdPage-tabSettings">
                    <ul className="CoinIdPage-tabSettings-list">
                        <li className='CoinIdPage-tabSettings-list-item'>
                            <button
                                className={`CoinIdPage-tabSettings-chart CoinIdPage-tabSettings-list-item-button
                                CoinIdPage-tabSettings-${activeTab === 'chart' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('chart')}
                            >
                                Chart
                            </button>
                        </li>
                        <li className='CoinIdPage-tabSettings-list-item'>
                            <button
                                className={`CoinIdPage-tabSettings-markets CoinIdPage-tabSettings-list-item-button
                                CoinIdPage-tabSettings-${activeTab === 'markets' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('markets')}
                            >
                                Markets
                            </button>
                        </li>
                        <li className='CoinIdPage-tabSettings-list-item'>
                            <button
                                className={`CoinIdPage-tabSettings-stats CoinIdPage-tabSettings-list-item-button
                                CoinIdPage-tabSettings-${activeTab === 'stats' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('stats')}
                            >
                                Stats
                            </button>
                        </li>
                        <li className='CoinIdPage-tabSettings-list-item'>
                            <button
                                className={`CoinIdPage-tabSettings-description CoinIdPage-tabSettings-list-item-button
                                CoinIdPage-tabSettings-${activeTab === 'description' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="CoinIdPage-tabs">
                    <div
                        className={`CoinIdPage-tabs-chart
                        CoinIdPage-tabs-${activeTab === 'chart' ? 'active' : 'inactive'}`}
                    >
                        {coinIdComponents.Chart}
                    </div>
                    <div
                        className={`CoinIdPage-tabs-markets
                        CoinIdPage-tabs-${activeTab === 'markets' ? 'active' : 'inactive'}`}
                    >
                        {coinIdComponents.Markets}
                    </div>
                    <div
                        className={`CoinIdPage-tabs-stats
                        CoinIdPage-tabs-${activeTab === 'stats' ? 'active' : 'inactive'}`}
                    >
                        {coinIdComponents.Perfomance}
                        <br/>
                        {coinIdComponents.Stats}
                    </div>
                    <div
                        className={`CoinIdPage-tabs-description
                        CoinIdPage-tabs-${activeTab === 'description' ? 'active' : 'inactive'}`}
                    >
                        {coinIdComponents.Description}
                    </div>
                </div>
                <div className="CoinIdPage-body">
                    <div className="CoinIdPage-body-left">
                        
                        {coinIdComponents.Markets}
                        {coinIdComponents.Description}
                    </div>
                    <div className="CoinIdPage-body-right">
                        {coinIdComponents.Stats}
                        {coinIdComponents.Perfomance}
                    </div>
                </div>
            </div>
           
        </StyledCoinIdPage>
    )
}

const StyledCoinIdPage = styled.div`
    .CoinIdPage {
        &-upper {
            margin: 0 auto;
            max-width: ${props => props.theme.max_width};
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-left {
                margin-bottom: ${props => props.theme.space.epsilon};
                & > * {
                    margin-bottom: ${props => props.theme.space.zeta};
                }
            }

        }
        &-body {
            margin: 0 auto;
            margin-top: ${props => props.theme.space.beta};
            max-width: ${props => props.theme.max_width};
            display: flex;
            justify-content: space-between;
            gap: ${props => props.theme.space.alpha};
            &-right {
                & > * {
                    margin-bottom: ${props => props.theme.space.beta};
                }
                flex-grow: 1;
            }
            &-left {
                & > * {
                    margin-bottom: ${props => props.theme.space.beta};
                }
            }
        }
        
        &-tabSettings {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: ${props => props.theme.space.gamma};
            border-bottom: 1px solid ${props => props.theme.color.epsilon};
            &-active {
                font-weight: ${props => props.theme.font.weight.alpha};
                color: ${props => props.theme.color.beta};
                border-bottom: 3px solid ${props => props.theme.color.beta};
            }
            &-inactive {
                border-bottom: 3px solid transparent
            }
            &-list {
                display: flex;
                align-items: center;
                color: ${props => props.theme.color.delta};
                gap: ${props => props.theme.space.epsilon};
                
                &-item {
                    &-button {
                        font-size: ${props => props.theme.font.size.gamma};
                        padding: ${props => props.theme.space.theta};
                    }
                }
            }
            
        }
        &-tabs {
            margin: ${props => props.theme.space.eta} auto;
            max-width: ${props => props.theme.max_width};
            &-active {

            }
            &-inactive {
                display: none;
            }
        }
        
        
    }
`

export default CoinIdPage

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
    const data = await response.json()

    const paths = data.map((coin: ListApiResult) => {
        return {
            params: {
                coinId: `${coin.id}`
            }
        }
    })
    
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    const coin = params!.coinId

    const coinResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
    const coinData = await coinResponse.json()

    const tickersResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/tickers?include_exchange_logo=true`)
    const tickersData = await tickersResponse.json()
    return {
        props: {
            coin: coinData,
            tickers: tickersData
        }
    }
}