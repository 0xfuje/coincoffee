import React from 'react'
import styled from 'styled-components'

interface DescriptionProps {
    name: string,
    description: string
}

function Description({name, description}: DescriptionProps) {
    return (
            <StyledDescription className='Description'>
                <h2 className='Description-title'>What is {name}?</h2>
                <p className='Description-para'>{description}</p>
            </StyledDescription>
        )
}

const StyledDescription = styled.div`
    .Description {
        &-title {
            font-size: ${props => props.theme.font.size.alpha};
        }
        &-para {
            max-width: 60ch;
        }
    }
`


export default Description