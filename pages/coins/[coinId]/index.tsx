import React, { useState } from 'react'
import { ListApiResult, TickerApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'
import Heading from '../../../components/Heading'
import { CoinApiResult } from '../../../types'
import styled from 'styled-components'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import {Price, Header, Description, Stats, Performance, Links, Chart} from '../../../components/coinId'
import Markets from '../../../components/coinId/Markets'

interface CoinIdPageProps {
    coin: CoinApiResult,
    tickers: TickerApiResult
}

type ActiveTab = 'chart' | 'markets' | 'price-stats' | 'description';



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
                {coinIdComponents.Header}
                {coinIdComponents.Links}
                {coinIdComponents.Price}
                {/* {coinIdComponents.Perfomance}
                {coinIdComponents.Stats}
                {coinIdComponents.Markets}
                {coinIdComponents.Description} */}
                {coinIdComponents.Chart}
                <div className="CoinIdPage-tabs">
                    <div className="CoinIdPage-tabs-chart"></div>
                    <div className="CoinIdPage-tabs-chart"></div>
                    <div className="CoinIdPage-tabs-chart"></div>
                    <div className="CoinIdPage-tabs-chart"></div>
                </div>
            </div>
           
        </StyledCoinIdPage>
    )
}

const StyledCoinIdPage = styled.div`
    .CoinIdPage {
        margin: ${props => props.theme.space.eta} auto;
        max-width: ${props => props.theme.max_width};
        & > * {
            margin-bottom: ${props => props.theme.space.epsilon};
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