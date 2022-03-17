import React, { useState } from 'react'
import { ListApiResult, TickerApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'
import Heading from '../../../components/Heading'
import { CoinApiResult } from '../../../types'
import styled from 'styled-components'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import {Price, Header, Description, Stats, Ticker} from '../../../components/coinId'
import Markets from '../../../components/coinId/Markets'

interface CoinIdPageProps {
    coin: CoinApiResult,
    tickers: TickerApiResult
}

type ActiveTab = 'chart' | 'markets' | 'price-stats' | 'description';



function CoinIdPage({ coin, tickers }: CoinIdPageProps) {
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings.list;
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
            price={coin.market_data.current_price[currency]}
            market_cap={coin.market_data.market_cap[currency]}
            volume={coin.market_data.total_volume[currency]}
            low_24h={coin.market_data.low_24h[currency]}
            high_24h={coin.market_data.high_24h[currency]}
            market_cap_rank={coin.market_cap_rank}
            ath={coin.market_data.ath[currency]}
            ath_change_percentage={coin.market_data.ath_change_percentage[currency]}
            ath_date={coin.market_data.ath_date[currency].slice(0, -14)}
            atl={coin.market_data.atl[currency]}
            atl_change_percentage={coin.market_data.atl_change_percentage[currency]}
            atl_date={coin.market_data.atl_date[currency].slice(0, -14)}
            total_supply={coin.market_data.total_supply}
            max_supply={coin.market_data.max_supply}
            circulating_supply={coin.market_data.circulating_supply}
            full_valuation={coin.market_data.fully_diluted_valuation[currency]}
            cur={'$'}
        />,
        Price: <Price
            name={coin.name}
            price={coin.market_data.current_price[currency]}
            low_24h={coin.market_data.low_24h[currency]}
            high_24h={coin.market_data.high_24h[currency]}
            change_24h={coin.market_data.price_change_percentage_24h}
            btc={coin.market_data.current_price.btc}
            eth={coin.market_data.current_price.eth}
        />,
        Markets: <Markets name={coin.name} tickers={tickers} />,
    }
    return (
        <StyledCoinIdPage>
            <Heading isSubTitleDisplayed={false}/>
            <div className="CoinIdPage">
                {coinIdComponents.Header}
                {coinIdComponents.Price}
                {/* {coinIdComponents.Stats} */}
                {coinIdComponents.Markets}
                
            </div>
           
        </StyledCoinIdPage>
    )
}

const StyledCoinIdPage = styled.div`
    .CoinIdPage {
        margin: ${props => props.theme.space.eta};
        &-tabs {
            margin-top: ${props => props.theme.space.delta};
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