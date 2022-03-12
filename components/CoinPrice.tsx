import React from 'react'
import styled from 'styled-components'

interface CoinPriceProps {
    name: string,
    price: number,
    low_24h: number,
    high_24h: number,
    btc: number,
    eth: number
}

function CoinPrice({}: CoinPriceProps) {
  return (
    <StyledCoinPrice className='CoinPrice'>
        <p className='CoinPrice-name'>${}</p>
    </StyledCoinPrice>
  )
}

const StyledCoinPrice = styled.div`

`

export default CoinPrice