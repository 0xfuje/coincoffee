import styled from 'styled-components'
import React from 'react'
import { ListApiOrder, ListApiPriceChange, PageSettingsProps, SupportedCurrencies } from '../types'

function PageSettings({setCurrency, setOrder, setPriceChange}: PageSettingsProps) {
  return (
    <StyledPageSettings className='PageSettings'>
        <select className='PageSettings-currency' name="currency" id="currency" onChange={(e) => setCurrency(e.target.value as SupportedCurrencies)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="chf">CHF</option>
            <option value="cny">CNY</option>
            <option value="jpy">JPY</option>
            <option value="gbp">GBP</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
        </select>
        <select className='PageSettings-timeframe' name="timeFrame" id="timeFrame" onChange={(e) => setPriceChange(e.target.value as ListApiPriceChange)}>
            <option value="1h">1h</option>
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="14d">14d</option>
            <option value="30d">30d</option>
            <option value="200d">200d</option>
            <option value="1y">1y</option>
        </select>
        <select className='PageSettings-order' name="order" id="order" onChange={(e) => setOrder(e.target.value as ListApiOrder)}>
            <option value="market_cap_desc">Market cap</option>
            <option value="volume_desc">Volume</option>
        </select>
    </StyledPageSettings>
  )
}

const StyledPageSettings = styled.div`
    
`

export default PageSettings