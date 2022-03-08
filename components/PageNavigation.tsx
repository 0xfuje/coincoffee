import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface PageNavProps {
    pageNumber: number,
    changePageNumber: (pageNumber: number) => {
        payload: number;
        type: string;
    }
}

function PageNavigation({ pageNumber, changePageNumber }: PageNavProps ) {
  return (
    <StyledPageNavigation className='PageNavigation'>
        <button className='' onClick={() => changePageNumber(pageNumber + 1)}>Next Page</button>
    </StyledPageNavigation>
  )
}

const StyledPageNavigation = styled.div`
    
`

export default PageNavigation