import styled from 'styled-components'
import React from 'react'
import { ListApiOrder, ListApiPriceChange, PageSettingsProps, SupportedCurrencies } from '../types'

function PageSettings(
    {
        setCurrency,
        setOrder,
        setPriceChange,
        currency,
        order,
        priceChange
    } : PageSettingsProps) {
  return (
    <StyledPageSettings className='PageSettings'>
        <div className="PageSettings-select">
            <select 
                className='PageSettings-select-currency'
                name="currency"
                id="currency"
                onChange={(e) => setCurrency(e.target.value as SupportedCurrencies)}
                value={currency}
            >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="chf">CHF</option>
                <option value="cny">CNY</option>
                <option value="jpy">JPY</option>
                <option value="gbp">GBP</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
            </select>
            
        </div>
       
        <div className="PageSettings-select">
            <select 
                className='PageSettings-select-timeframe'
                name="timeFrame"
                id="timeFrame"
                onChange={(e) => setPriceChange(e.target.value as ListApiPriceChange)}
                value={priceChange}
            >
                <option value="1h">1h</option>
                <option value="24h">24h</option>
                <option value="7d">7d</option>
                <option value="14d">14d</option>
                <option value="30d">30d</option>
                <option value="200d">200d</option>
                <option value="1y">1y</option>
            </select>
            
        </div>
      
        <div className="PageSettings-select">
            <select 
                className='PageSettings-select-order' 
                name="order" id="order" 
                onChange={(e) => setOrder(e.target.value as ListApiOrder)}
                value={order}
            >
                <option value="market_cap_desc">Market cap</option>
                <option value="volume_desc">Volume</option>
            </select>
            
        </div>
       
    </StyledPageSettings>
  )
}

const StyledPageSettings = styled.div`

    margin-bottom: ${props => props.theme.space.gamma};
    display: flex;
    justify-content: center;
    gap: ${props => props.theme.space.epsilon};

    option {
        padding: ${props => props.theme.space.theta} ${props => props.theme.space.zeta};
        border-radius: ${props => props.theme.space.theta};
        background-color: ${props => props.theme.color.epsilon};
        cursor: pointer;
    }


    .PageSettings {
        &-select {
            display: grid;
            grid-template-areas: "select";
            padding: ${props => props.theme.space.theta} ${props => props.theme.space.zeta};
            border-radius: ${props => props.theme.space.theta};
            background-color: ${props => props.theme.color.epsilon};
            cursor: pointer;
            align-items: center;
            &::after {
                grid-area: select;
                content: "";
                width: 0.8em;
                height: 0.5em;
                background-color: ${props => props.theme.color.alpha};
                clip-path: polygon(50% 75%, 0 0, 100% 0);
                justify-self: end;
            }
            select {
                grid-area: select;
                appearance: none;
                background-color: transparent;
                border: none;
                padding: 0 1em 0 0;
                margin: 0;
                width: 100%;
                font-family: inherit;
                font-size: inherit;
                font-weight: inherit;
                cursor: inherit;
                line-height: inherit;
                outline: none;
                
            }
        }
        
    }
`

export default PageSettings