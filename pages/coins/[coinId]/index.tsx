import React from 'react'
import { useRouter } from 'next/router'
import { useGetCoinQuery } from '../../../slices/api/apiSlice';
import { ParsedUrlQuery } from 'querystring';

function CoinPage() {
    const router = useRouter();
    const { coinId }: ParsedUrlQuery = router.query;
    const {
      data: coin,
      isFetching: isCoinQueryFetching,
      isSuccess: isCoinQuerySuccess,
    } = useGetCoinQuery(coinId as string);
    
    console.log(`Fetching: ${isCoinQueryFetching}`)
    console.log(`Success: ${isCoinQuerySuccess}`)
    console.log(coin);
  
    if (isCoinQuerySuccess) {
      return (
        <div>
          <h1>{coin!.name}</h1>
          <h2>Market cap: ${coin!.market_data.market_cap.usd.toLocaleString()}</h2>
        </div>
      )
    }
  
  if (isCoinQueryFetching) {
      return (
      <div>
        <h1>Loading data about {coinId}</h1>
      </div>
    )
    }
    
    return <h1>{coinId} Page</h1>
}

export default CoinPage