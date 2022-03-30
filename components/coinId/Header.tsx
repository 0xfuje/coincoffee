import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {default as MyLink} from '../universal/Link'
import {default as NextLink} from 'next/link'

interface HeaderProps {
    logo: string,
    name: string,
    market_cap_rank: number,
    symbol: string
}

function Header({logo, name, market_cap_rank, symbol}: HeaderProps) {
  return (
    <StyledHeader className="Header">
        <div className="Header-nav">
            <span className='Header-nav-link'><NextLink href='/'><a>Coins</a></NextLink></span>
            <span className='Header-nav-span'> &nbsp;&gt;&nbsp; </span>
            <span className='Header-nav-current'>{name}</span>
        </div>
        <div className="Header-info">
            <Image src={logo} width='36px' height='36px'/>
            <h1 className='Header-info-name'>{name}</h1>
            <MyLink size="small">Rank #{market_cap_rank}</MyLink>
            <MyLink size="small">{symbol.toUpperCase()}</MyLink>
        </div>
       
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
    .Header {
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

export default Header