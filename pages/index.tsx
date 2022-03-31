import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import CoinList from '../components/index/CoinList'
import { useGetListQuery } from '../slices/api/apiSlice'
import PageSettings from '../components/index/PageSettings'
import PageNavigation from '../components/index/PageNavigation'
import { RootState } from '../app/store'
import { changeCurrency, changeOrder, changePageNumber, changePriceChange } from '../slices/api/apiSettingsSlice'
import { ListApiOrder, ListApiPriceChange, SupportedCurrencies } from '../types'
import PageHeader from '../components/universal/PageHeader'
import PageFooter from '../components/universal/PageFooter'


const Home: NextPage = () => {
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency, list } = pageSettings
    const { order, pageNumber, priceChange } = list
    const currencyName = currency.name
    const {
        data: coins,
        isFetching: isCoinsFetching,
        isSuccess: isCoinsSuccess
    } = useGetListQuery({currency: currencyName, order, pageNumber, priceChange})

    const dispatch = useAppDispatch();

    const setPageNumber = (pageNumber: number) => dispatch(changePageNumber(pageNumber))
    const setCurrency = (currencyName: SupportedCurrencies) => dispatch(changeCurrency(currencyName))
    const setOrder = (order: ListApiOrder) => dispatch(changeOrder(order))
    const setPriceChange = (priceChange: ListApiPriceChange) => dispatch(changePriceChange(priceChange))

    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader isSubTitleDisplayed={true} />
            <PageSettings
                setCurrency={setCurrency} currency={currencyName}
                setOrder={setOrder} order={order}
                setPriceChange={setPriceChange} priceChange={priceChange}
            />
            <CoinList coins={coins} priceChange={priceChange}/>
            <PageNavigation 
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
            <PageFooter />
            
        </StyledHome>
    )
}


const StyledHome = styled.div`
    .Home {
        
    }
`
export default Home;
