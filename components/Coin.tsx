import React from 'react'
import Link from 'next/link';
import styled from 'styled-components';
import { CoinProps } from '../types';

function Coin(props: CoinProps) {
    console.log(props)
    return (
        <StyledCoin className='Coin'>
            {props.name}
        </StyledCoin>
    )
    }

const StyledCoin = styled.div`
    

`

export default Coin;