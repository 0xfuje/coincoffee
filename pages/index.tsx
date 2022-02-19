import type { NextPage } from 'next'
import Head from 'next/head'
import { useGetListQuery } from '../features/api/apiSlice'

const Home: NextPage = () => {
    const {
        data: coinList,
        isFetching,
        isSuccess
    } = useGetListQuery(
        {
            currency: 'usd',
            order: 'market_cap_desc',
            pageNum: 1,
            priceChange: '1y'
        }
    );
    console.log(coinList);
    return (
        <div className="Home">
        <Head>
            <title>CoinCoffee ☕</title>
            <meta name="description" content="Your daily dose of crypto caffeine, served in a delicious coffee" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        
    
        </div>
    )
}

export default Home;
