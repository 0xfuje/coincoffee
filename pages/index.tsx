import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import CoinList from '../components/CoinList'
import { useGetListQuery } from '../slices/api/apiSlice'
import { useAppDispatch } from '../app/hooks'
import { ListApiSettings, SupportedCurrencies, ListApiOrder, ListApiPriceChange } from '../types'
import PageSettings from '../components/PageSettings'
import PageNavigation from '../components/PageNavigation'



const Home: NextPage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [currency, setCurrency] = useState<SupportedCurrencies>('usd');
    const [order, setOrder] = useState<ListApiOrder>('market_cap_desc');
    const [priceChange, setPriceChange] = useState<ListApiPriceChange>('1y');
    
    const settings = {setPageNumber, setCurrency, setOrder, setPriceChange}
    
    const dispatch = useAppDispatch()
    const {
        data: coins,
        isFetching: isCoinsFetching,
        isSuccess: isCoinsSuccess
    } = useGetListQuery({currency, order, pageNumber, priceChange})

    console.log(`Are coins fetching? ${isCoinsFetching}`)
    console.log(`Are coins successfully fetched? ${isCoinsSuccess}`)

    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className='Home-title'>CoinCoffee ☕</h1>
            <PageSettings 
                currency={currency} setCurrency={setCurrency}
                order={order} setOrder={setOrder}
                priceChange={priceChange} setPriceChange={setPriceChange}
            />
            <div className="Home-list">
                <div className="Home-list-header">
                    <div className="Home-list-asset">cryptoasset</div>
                    <div className="Home-list-price">price</div>
                    <div className="Home-list-priceChange">{priceChange}%</div>
                    <div className="Home-list-marketCap">market cap</div>
                </div>
            <CoinList coins={coins}/>
            <PageNavigation pageNumber={pageNumber} setPageNumber={setPageNumber} />
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
