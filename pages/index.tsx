import type { NextPage } from 'next'
import Head from 'next/head'
import { RootState } from '../app/store'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useEffect } from 'react'
import { useGetListQuery } from '../features/api/apiSlice'

const Home: NextPage = () => {
    const pageSettings = useAppSelector((state: RootState) => state.pageSettings)
    const dispatch = useAppDispatch();
    const {
        data: coins,
        isFetching,
        isSuccess
    } = useGetListQuery(pageSettings);
    console.log(coins);
    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className='Home-title'>CoinCoffee ☕</h1>
        </StyledHome>
    )
}

const StyledHome = styled.div`
    
`

export default Home;
