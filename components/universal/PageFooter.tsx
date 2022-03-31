import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { globalPagePadding } from '../../styles/GlobalStyle'


function PageFooter({}) {
    return (
        <StyledPageFooter className="PageFooter">
            <div className="PageFooter-line" />
            <div className="PageFooter-wrap">
                <p className='PageFooter-text'>© {new Date().getFullYear()} CoinCoffee - All rights reserved.</p>
            </div>
        </StyledPageFooter>
  )
}

const StyledPageFooter = styled.footer`
    
    .PageFooter {
        &-line {
            height: 1px;
            margin-top: ${props => props.theme.space.beta};
            background-color: ${props => props.theme.color.epsilon};
        }
        &-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: auto;
            height: ${props => props.theme.space.alpha};
            ${globalPagePadding}
        }
        &-text {
            text-align: center;
            font-size: ${props => props.theme.font.size.delta};
            color: ${props => props.theme.color.gamma};
        }
    }
`

export default PageFooter;


