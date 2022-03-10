import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import CoinTable from '../components/CoinTable'
import { useGetListQuery } from '../slices/api/apiSlice'
import PageSettings from '../components/PageSettings'
import PageNavigation from '../components/PageNavigation'
import { RootState } from '../app/store'
import { changeCurrency, changeOrder, changePageNumber, changePriceChange } from '../slices/api/apiSettingsSlice'
import { ListApiOrder, ListApiPriceChange, SupportedCurrencies } from '../types'
import Heading from '../components/Heading'


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

    const setPageNumber = (pageNumber: number): any => dispatch(changePageNumber(pageNumber))
    const setCurrency = (currency: SupportedCurrencies): any => dispatch(changeCurrency(currency))
    const setOrder = (order: ListApiOrder): any => dispatch(changeOrder(order))
    const setPriceChange = (priceChange: ListApiPriceChange): any => dispatch(changePriceChange(priceChange))

    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Heading isSubTitleDisplayed={true} />
            <PageSettings
                setCurrency={setCurrency}
                setOrder={setOrder}
                setPriceChange={setPriceChange}
            />
            <CoinTable coins={coins} priceChange={priceChange}/>
            <PageNavigation 
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />

            
        </StyledHome>
    )
}


const StyledHome = styled.div`
    .Home {
        
    }
`
export default Home;
