import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Button from '../Button'
import Link from 'next/link'

interface CoinIdHeaderProps {
    logo: string,
    name: string,
    market_cap_rank: number,
    symbol: string
}

function CoinIdHeader({logo, name, market_cap_rank, symbol}: CoinIdHeaderProps) {
  return (
    <StyledCoinIdHeader className="CoinIdHeader">
        <div className="CoinIdHeader-nav">
            <span className='CoinIdHeader-nav-link'><Link href='/'><a>Coins</a></Link></span>
            <span className='CoinIdHeader-nav-span'> &nbsp;&gt;&nbsp; </span>
            <span className='CoinIdHeader-nav-current'>Bitcoin</span>
        </div>
        <div className="CoinIdHeader-info">
            <Image src={logo} width='36px' height='36px'/>
            <h1 className='CoinIdHeader-info-name'>{name}</h1>
            <Button text={`Rank #${market_cap_rank}`}size="small" />
            <Button text={symbol.toUpperCase()} size="small" />
        </div>
       
    </StyledCoinIdHeader>
  )
}

const StyledCoinIdHeader = styled.div`
    margin-bottom: ${props => props.theme.space.epsilon};
    .CoinIdHeader {
        &-nav {
            font-size: ${props => props.theme.font.size.delta};
            margin-bottom: ${props => props.theme.space.epsilon};
            &-link {
                color: ${props => props.theme.color.gamma};
                &:hover {
                    text-decoration: underline;
                }
            }
            &-span {
                color: ${props => props.theme.color.gamma};
            }
            &-current {
                color: ${props => props.theme.color.alpha};
            }
        }
        &-info {
            display: flex;
            align-items: center;
            gap: ${props => props.theme.space.zeta};
            &-name {
                font-size: ${props => props.theme.font.size.alpha};
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

export default CoinIdHeader