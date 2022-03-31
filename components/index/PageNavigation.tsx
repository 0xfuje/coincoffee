import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface PageNavProps {
    pageNumber: number,
    setPageNumber: (pageNumber: number) => {
        payload: number;
        type: string;
    }
}



function PageNavigation({ pageNumber, setPageNumber }: PageNavProps ) {
    const handlePageNumberChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <StyledPageNavigation className='PageNavigation'>
            <button className='button' disabled={(pageNumber <= 1)} onClick={() => handlePageNumberChange(pageNumber - 1)}>‹&nbsp;Prev</button>
            {(pageNumber > 2) ? <button className='button' onClick={() => handlePageNumberChange(1)}>1</button> : ''} 
            {(pageNumber > 3) ? <button className='button' onClick={() => handlePageNumberChange(pageNumber - 2)}>{pageNumber - 2}</button> : ''} 
            {(pageNumber > 1) ? <button className='button' onClick={() => handlePageNumberChange(pageNumber - 1)}>{pageNumber - 1}</button> : ''} 
            <button className='button button-selected' onClick={() => handlePageNumberChange(pageNumber)}>{pageNumber}</button>
            <button className='button' onClick={() => handlePageNumberChange(pageNumber + 1)}>{pageNumber + 1}</button>
            <button className='button' onClick={() => handlePageNumberChange(pageNumber + 2)}>{pageNumber + 2}</button>
            <button className='button' onClick={() => handlePageNumberChange(pageNumber + 1)}>Next&nbsp;›</button>
        </StyledPageNavigation>
    )
}

const StyledPageNavigation = styled.div`
    margin: ${props => props.theme.space.delta} auto ${props => props.theme.space.beta};
    text-align: center;
    display: flex;
    justify-content: space-around;
    width: 15rem;
   .button {
        cursor: pointer;
        padding: ${props => props.theme.space.eta} ${props => props.theme.space.zeta};
        border-radius: ${props => props.theme.space.iota};
        background-color: ${props => props.theme.space.zeta};
        &:hover {
            background-color: ${props => props.theme.color.zeta};
        }
    }
    .button-selected {
        background-color: ${props => props.theme.color.alpha};
        color: ${props => props.theme.color.zeta};
        &:hover {
            background-color: ${props => props.theme.color.beta};
        }
    }
`

export default PageNavigation