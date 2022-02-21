import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import { useGetListQuery } from '../features/api/apiSlice'


const Home: NextPage = () => {
    const {
        data: coins,
        isFetching,
        isSuccess,
    } = useGetListQuery()
    return (
        <StyledHome className="Home">
            <Head>
                <title>CoinCoffee ☕</title>
                <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
        </StyledHome>
    )
}

const StyledHome = styled.div`
    .Home {
        
    }
`

export default Home;
