import React from 'react'
import styled from 'styled-components'

function Heading() {
    return (
        <StyledHeading className="Heading">
            <h1 className='Heading-title'>CoinCoffee ☕</h1>
            <p className="Heading-subtitle">Your daily dose of crypto caffeine, served in a delicious coffee</p>
            <span className="Heading-line" />
        </StyledHeading>
  )
}

const StyledHeading = styled.div`
    .Heading {
        &-title {
            font-size: ${props => props.theme.font.size.beta};
            text-align: center;
            margin-top: ${props => props.theme.space.epsilon};
            margin-bottom: ${props => props.theme.space.gamma};
            position: relative;
            &:after {
                position: absolute;
                content: '';
                height: 1px;
                width: 100%;
                background-color: ${props => props.theme.color.epsilon};
                bottom: -${props => props.theme.space.epsilon};
                left: -${props => props.theme.space.eta};
            }
        }
        &-subtitle {
            text-align: center;
            margin: 0 ${props => props.theme.space.beta} ${props => props.theme.space.epsilon};

        }
        &-line {

        }
    }
`

export default Heading;