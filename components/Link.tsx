import React from 'react'
import styled, { css } from 'styled-components'

interface LinkProps {
    size: 'small' | 'big',
    href?: string,
    children: React.ReactNode
}
interface StyledLinkProps {
    readonly size: LinkProps['size']
    readonly href: LinkProps['href']
}

function Link({size, href, children}: LinkProps) {
    return (
        <StyledLink className='Link' size={size} href={href}>
            {children}
        </StyledLink>
    )
}

const StyledLink = styled.a<StyledLinkProps>`
    --pointer: pointer;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.space.eta};
    font-size: ${props => props.theme.font.size.delta};
    // font-weight: ${props => props.theme.font.weight.alpha};
    background-color: ${props => props.theme.color.epsilon};
    color: ${props => props.theme.color.beta};
    padding: ${props => (props.size === 'big') ?  props.theme.space.eta : props.theme.space.theta};
    border-radius: ${props => props.theme.space.iota};
    
    &:hover {
        ${props => props.href &&
        css`
            cursor: pointer;
            color: ${props => props.theme.color.eta};
            background-color: ${props.theme.color.gamma} 
        `}
    }
    
`

export default Link