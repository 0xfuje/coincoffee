import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
    text: string
    onClick: () => void
}

function Button({text, onClick}: ButtonProps) {
  return (
    <StyledButton className='Button' onClick={onClick}>
        {text}
    </StyledButton>
  )
}

const StyledButton = styled.button`
    color: ${props => props.theme.color.eta};
    background-color: ${props => props.theme.color.beta};
    padding: ${props => props.theme.space.eta} ${props => props.theme.space.zeta};
    border-radius: ${props => props.theme.space.iota};

`

export default Button