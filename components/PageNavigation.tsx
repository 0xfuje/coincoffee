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
  return (
    <StyledPageNavigation className='PageNavigation'>
        <button className='' onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button>
    </StyledPageNavigation>
  )
}

const StyledPageNavigation = styled.div`
    
`

export default PageNavigation