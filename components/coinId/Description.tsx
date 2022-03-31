import React from 'react'
import styled from 'styled-components'
const HtmlToReactParser = require('html-to-react').Parser

interface DescriptionProps {
    name: string,
    text: string
}

function Description({name, text}: DescriptionProps) {
    const htmlToReactParser = new HtmlToReactParser()
    const description = htmlToReactParser.parse(text)
    return (
        <StyledDescription className='Description'>
            <h2 className='Description-title'>What is {name}?</h2>
            <p className='Description-text'>{description}</p>
        </StyledDescription>
    )
}

const StyledDescription = styled.div`
    // max-width: ${props => props.theme.breakpoint.zeta};

    a {
        font-weight: ${props => props.theme.font.weight.alpha};
        &:hover {
            text-decoration: underline;
        }
    }
    .Description {
        &-title {
            font-size: ${props => props.theme.font.size.beta};
            font-weight: ${props => props.theme.font.weight.alpha};
            margin-bottom: ${props => props.theme.space.theta};
        }
    }
`


export default Description