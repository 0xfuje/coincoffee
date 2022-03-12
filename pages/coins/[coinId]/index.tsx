import React, { useState } from 'react'
import { ListApiResult } from '../../../types'
import { GetStaticProps, GetStaticPaths } from 'next'
import Heading from '../../../components/Heading'
import Image from 'next/image'
import { CoinApiResult } from '../../../types'
import styled from 'styled-components'
import Button from '../../../components/Button'

interface CoinPageProps {
    coin: CoinApiResult
}

function CoinPage({ coin }: CoinPageProps) {
    
    return (
        <StyledCoinPage>
            <Heading isSubTitleDisplayed={false}/>
            <div className="CoinPage">
                <div className="CoinPage-Header">
                    <Image src={coin.image.small} width='36px' height='36px'/>
                    <h1 className='CoinPage-Header-name'>{coin.name}</h1>
                    <Button text={`Rank #${coin.market_cap_rank}`}size="small" />
                    <Button text={coin.symbol.toUpperCase()} size="small" />
                    
                </div>
                
                <h2>Price: ${coin.market_data.current_price.usd}</h2>
            </div>
           
        </StyledCoinPage>
    )
}

const StyledCoinPage = styled.div`
    .CoinPage {
        margin: ${props => props.theme.space.eta};
        &-Header {
            display: flex;
            align-items: center;
            gap: ${props => props.theme.space.zeta};
            &-name {
                font-size: ${props => props.theme.font.size.beta};
                font-weight: ${props => props.theme.font.weight.alpha};
            }
            &-rank {

            }
            &-symbol {
                text-transform: uppercase;
            }

        }
    }
`

export default CoinPage

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
    const data = await response.json()

    const paths = data.map((coin: ListApiResult) => {
        return {
            params: {
                coinId: `${coin.id}`
            }
        }
    })
    
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    const coin = params!.coinId
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
    const data = await response.json()

    return {
        props: {
            coin: data
        }
    }
}