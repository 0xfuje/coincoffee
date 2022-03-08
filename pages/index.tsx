import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import CoinList from '../components/CoinList'
import { useGetListQuery } from '../slices/api/apiSlice'
import PageSettings from '../components/PageSettings'
import PageNavigation from '../components/PageNavigation'
import { RootState } from '../app/store'
import { jumpToPage } from '../slices/api/apiSettingsSlice'



const Home: NextPage = () => {
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { 
        currency,
        order,
        pageNumber,
        priceChange
    } = pageSettings.list;
    
    const {
        data: coins,
        isFetching: isCoinsFetching,
        isSuccess: isCoinsSuccess
    } = useGetListQuery({currency, order, pageNumber, priceChange})

    const dispatch = useAppDispatch();

    console.log(`Are coins fetching? ${isCoinsFetching}`)
    console.log(`Are coins successfully fetched? ${isCoinsSuccess}`)

    const changePageNumber = (pageNumber: number) => dispatch(changePageNumber(pageNumber))
    

    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className='Home-title'>CoinCoffee ☕</h1>
            <PageSettings 
                currency={currency}
                order={order}
                priceChange={priceChange}
            />
            <div className="Home-list">
                <div className="Home-list-header">
                    <div className="Home-list-asset">cryptoasset</div>
                    <div className="Home-list-price">price</div>
                    <div className="Home-list-priceChange">{priceChange}%</div>
                    <div className="Home-list-marketCap">market cap</div>
                </div>
            <CoinList coins={coins}/>
            <PageNavigation 
                pageNumber={pageNumber}
                changePageNumber={changePageNumber}
            />
            </div>

            
        </StyledHome>
    )
}


const StyledHome = styled.div`
    .Home {
        button {
            cursor: pointer;
        }
    }
`
export default Home;
