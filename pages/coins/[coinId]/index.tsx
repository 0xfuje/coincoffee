import { ListApiResult, TickerApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'
import PageHeader from '../../../components/universal/PageHeader'
import PageFooter from '../../../components/universal/PageFooter'
import { CoinApiResult } from '../../../types'
import styled, { css } from 'styled-components'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import {Price, Header, Description, Stats, Performance, Links, Chart, SmallStats, Markets, Tabs} from '../../../components/coinId'
import { globalPagePadding } from '../../../styles/GlobalStyle'

interface CoinIdPageProps {
    coin: CoinApiResult,
    tickers: TickerApiResult
}

function CoinIdPage({ coin, tickers }: CoinIdPageProps) {
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings;
    
    const components = {
        Header: <Header 
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.image.large}
            market_cap_rank={coin.market_cap_rank}
        />,
        SmallStats: <SmallStats
            symbol={coin.symbol}
            market_cap={coin.market_data.market_cap[currency.name]}
            volume={coin.market_data.total_volume[currency.name]}
            currency={currency.symbol}
        />,
        Stats: <Stats
            name={coin.name}
            symbol={coin.symbol}
            price={coin.market_data.current_price[currency.name]}
            market_cap={coin.market_data.market_cap[currency.name]}
            volume={coin.market_data.total_volume[currency.name]}
            low_24h={coin.market_data.low_24h[currency.name]}
            high_24h={coin.market_data.high_24h[currency.name]}
            market_cap_rank={coin.market_cap_rank}
            ath={coin.market_data.ath[currency.name]}
            ath_change_percentage={coin.market_data.ath_change_percentage[currency.name]}
            ath_date={coin.market_data.ath_date[currency.name].slice(0, -14)}
            atl={coin.market_data.atl[currency.name]}
            atl_change_percentage={coin.market_data.atl_change_percentage[currency.name]}
            atl_date={coin.market_data.atl_date[currency.name].slice(0, -14)}
            total_supply={coin.market_data.total_supply}
            max_supply={coin.market_data.max_supply}
            circulating_supply={coin.market_data.circulating_supply}
            full_valuation={coin.market_data.fully_diluted_valuation[currency.name]}
            currency={currency.symbol}
        />,
        
        Price: <Price
            name={coin.name}
            price={coin.market_data.current_price[currency.name]}
            low_24h={coin.market_data.low_24h[currency.name]}
            high_24h={coin.market_data.high_24h[currency.name]}
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
            <PageHeader isSubTitleDisplayed={false}/>
            <div className="CoinIdPage">
                <div className="CoinIdPage-upper">
                    <div className="CoinIdPage-upper-left">
                        {components.Header}
                        {components.Links}
                        {components.Price}
                    </div>
                    <div className="CoinIdPage-upper-right">
                        {components.SmallStats}
                    </div>
                </div>
                <div className="CoinIdPage-tabs">
                    <Tabs components={components} />
                </div>
                <div className="CoinIdPage-body">
                    <div className="CoinIdPage-body-left">
                        <div className="CoinIdPage-body-left-markets">{components.Markets}</div>
                        <div className="CoinIdPage-body-left-description">{components.Description}</div>
                    </div>
                    <div className="CoinIdPage-body-right">
                        <div className="CoinIdPage-body-right-stats">{components.Stats}</div>
                        <div className="CoinIdPage-body-right-performance">{components.Perfomance}</div>
                    </div>
                </div>
            </div>
            <PageFooter />
        </StyledCoinIdPage>
    )
}




const StyledCoinIdPage = styled.div`
    .CoinIdPage {
        &-upper {
            ${globalPagePadding}
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
            &-right {
                display: none;
                @media screen and (min-width: ${props => props.theme.breakpoint.epsilon}) {
                    display: block;
                }
            }

        }
        &-tabs {
            
        }
        &-body {
            display: none;
            margin: 0 auto;
            margin-top: ${props => props.theme.space.beta};
            max-width: ${props => props.theme.max_width};
            justify-content: space-between;
            gap: ${props => props.theme.space.alpha};
            ${globalPagePadding}
            @media screen and (min-width: ${props => props.theme.breakpoint.gamma}) {
                display: flex;
            }
            &-right {
                & > * {
                    max-width: ${props => props.theme.breakpoint.zeta};
                    margin-bottom: ${props => props.theme.space.beta};
                }
                flex-grow: 1;
            }
            &-left {
                & > * {
                    max-width: ${props => props.theme.breakpoint.zeta};
                    margin-bottom: ${props => props.theme.space.beta};
                }
            }
        }
        
        
    }
`;

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