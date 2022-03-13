import React from 'react'
import styled from 'styled-components'

interface CoinIdDescriptionProps {
    name: string,
    description: string
}

function CoinIdDescription({name, description}: CoinIdDescriptionProps) {
    return (
            <StyledCoinIdDescription className='CoinIdDescription'>
                <h2 className='CoinIdDescription-title'>What is {name}?</h2>
                <p className='CoinIdDescription-para'>{description}</p>
            </StyledCoinIdDescription>
        )
}

const StyledCoinIdDescription = styled.div`
    .CoinIdDescription {
        &-title {
            font-size: ${props => props.theme.font.size.alpha};
        }
        &-para {
            max-width: 60ch;
        }
    }
`


export default CoinIdDescription