import React, { useState } from 'react'
import { ListApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'
import Heading from '../../../components/Heading'
import { CoinApiResult } from '../../../types'
import styled from 'styled-components'
import CoinIdHeader from '../../../components/coinId/CoinIdHeader'
import CoinIdPrice from '../../../components/coinId/CoinIdPrice'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import CoinIdDescription from '../../../components/coinId/CoinIdDescription'

interface CoinIdPageProps {
    coin: CoinApiResult
}

type ActiveTab = 'chart' | 'markets' | 'price-stats' | 'description';

function CoinIdPage({ coin }: CoinIdPageProps) {
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings.list;
    const [activeTab, setActiveTab] = useState<ActiveTab>('chart')
    
    return (
        <StyledCoinIdPage>
            <Heading isSubTitleDisplayed={false}/>
            <div className="CoinIdPage">
                <CoinIdHeader 
                    name={coin.name}
                    symbol={coin.symbol}
                    logo={coin.image.large}
                    market_cap_rank={coin.market_cap_rank}
                />
                <CoinIdPrice
                    name={coin.name}
                    price={coin.market_data.current_price[currency]}
                    low_24h={coin.market_data.low_24h[currency]}
                    high_24h={coin.market_data.high_24h[currency]}
                    change_24h={coin.market_data.price_change_percentage_24h}
                    btc={coin.market_data.current_price.btc}
                    eth={coin.market_data.current_price.eth}
                />
               {/*  <CoinIdDescription
                    name={coin.name}
                    description={coin.description.en}
                /> */}
                
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
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
    const data = await response.json()

    return {
        props: {
            coin: data
        }
    }
}