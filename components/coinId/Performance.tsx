import React from 'react'
import styled from 'styled-components'
import { convertColor } from '../../helpers'

interface PerformanceProps {
    p_24h: number,
    p_7d: number,
    p_30d: number,
    p_60d: number,
    p_200d: number,
    p_1y: number
}

function Performance({p_24h, p_7d, p_30d, p_60d, p_200d, p_1y}: PerformanceProps) {
    return (
        <StyledPerformance className='Performance'>
            <thead className="Performance-row-upper">
                <td className={`Performance-data`}>24h</td>
                <td className={`Performance-data`}>7d</td>
                <td className={`Performance-data`}>30d</td>
                <td className={`Performance-data`}>60d</td>
                <td className={`Performance-data`}>200d</td>
                <td className={`Performance-data`}>1y</td>
            </thead>
            <tr className="Performance-row-lower">
                <td className={`Performance-data Performance-data-${convertColor(p_24h)}`}>{p_24h.toFixed(1)}%</td>
                <td className={`Performance-data Performance-data-${convertColor(p_7d)}`}>{p_7d.toFixed(1)}%</td>
                <td className={`Performance-data Performance-data-${convertColor(p_30d)}`}>{p_30d.toFixed(1)}%</td>
                <td className={`Performance-data Performance-data-${convertColor(p_60d)}`}>{p_60d.toFixed(1)}%</td>
                <td className={`Performance-data Performance-data-${convertColor(p_200d)}`}>{p_200d.toFixed(1)}%</td>
                <td className={`Performance-data Performance-data-${convertColor(p_1y)}`}>{p_1y.toFixed(1)}%</td>
            </tr>
        </StyledPerformance>
    )
}

const StyledPerformance = styled.table`
    .Performance {
        &-row {
            &-upper {
                background-color: ${props => props.theme.color.zeta};
            }
        }
        &-data {
            text-align: center;
            text-transform: uppercase;
            padding: ${props => props.theme.space.eta};
            border: 1px solid ${props => props.theme.color.epsilon};
            &-green {
                color: ${props => props.theme.color.omega};
            }
            &-red {
                color: ${props => props.theme.color.psi};
            }
        }
    }
`

export default Performance