import React from 'react'
import styled from 'styled-components'

interface LinkProps {
    size: 'small' | 'medium' | 'big',
    text: string | number
    href?: string
}

function Link({size, text}: LinkProps) {
  return (
    <StyledLink className='Link'>
        {text}
    </StyledLink>
  )
}

const StyledLink = styled.div`
    font-size: ${props => props.theme.font.size.delta};

    color: ${props => props.theme.color.eta};
    background-color: ${props => props.theme.color.delta};
    padding: ${props => props.theme.space.theta} ${props => props.theme.space.eta};
    border-radius: ${props => props.theme.space.iota};
`

export default Link