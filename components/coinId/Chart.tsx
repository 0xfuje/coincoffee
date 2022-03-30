import styled, { css } from "styled-components"
import { Line } from 'react-chartjs-2'
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { useGetChartQuery } from "../../slices/api/apiSlice"
import { DateTime } from 'luxon'
import { SupportedCurrencies } from "../../types"
import 'chartjs-adapter-luxon'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    LineController,
    Interaction,
    Legend,
    LogarithmicScale,
    Filler,
    TimeSeriesScale
} from 'chart.js'
import  CrosshairPlugin, { Interpolate } from 'chartjs-plugin-crosshair'
import { useEffect, useState } from "react"
import { convertNum } from '../../helpers'
Interaction.modes.interpolate = Interpolate

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    LineController,
    Legend,
    CrosshairPlugin,
    LogarithmicScale,
    Filler,
    TimeSeriesScale
)

interface ChartProps {
    symbol: string,
    id: string
}

interface StyledChartProps {
    readonly days: Days
    readonly chartType: ChartType
    readonly dataType: DataType
}

type Days = 1 | 7 | 30 | 90 | 180 | 365 | 1095 | 'max'
type ChartType = 'logarithmic' | 'linear'
type DataType = 'price' | 'volume' | 'market_cap'


function Chart({symbol, id}: ChartProps) {
    const [days, setDays] = useState<Days>(90)
    const [chartType, setChartType] = useState<ChartType>('linear')
    const [dataType, setDataType] = useState<DataType>('price')

    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings
    const { 
        data: rawChartData,
        isFetching,
        isSuccess
    } = useGetChartQuery({coin: id, currency: currency.name, days})
    
    // Get data from api
    const getData = (array: undefined | Array<number[]>) => {
        let dates: number[] = []
        let data: number[] = []
        if (array === undefined || isFetching) return { dates, data };
        dates = array.map((data: number[]) => data[0]);
        data = array.map((data: number[]) => data[1]);
        return { dates, data }
    }
    
    // dataSets
    const price = getData(rawChartData?.prices)
    const volume = getData(rawChartData?.total_volumes)
    const market_cap = getData(rawChartData?.market_caps)

    const getDataSet = () => {
        if (dataType === 'price') return price.data
        if (dataType === 'volume') return volume.data
        if (dataType === 'market_cap') return market_cap.data
    }


    const getChartData = () => {
        /* const ctx = canvas.getContext('2d')
        const gradient = ctx?.createLinearGradient(0,0,0,0) */
        return {
            labels: price.dates,
            datasets: [
            {
                data: getDataSet(),
                borderColor: '#7F6F68',
                borderWidth: 2,
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 0,
                pointHitRadius: 0,
                backgroundColor: 'rgba(127, 111, 104, 0.1)',
                fill: true,
                
            },
    
        ],
        }
    }
    // const canvas = document.createElement('canvas')
    const options = {
        animation: false,
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                position: 'average',
                backgroundColor: 'rgba(243, 242, 241, 0.9)',
                titleColor: '#50433D',
                bodyColor: '#50433d',
                padding: 10,
                borderColor: '#D1C9C7',
                borderWidth: 1,
                callbacks: {
                    title: (ctx: any) => {
                        const iso = new Date(ctx[0].label).toISOString()
                        const dt = DateTime.fromISO(iso)
                        const formattedDate = dt.toLocaleString(
                                { 
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                }
                            )
                        return formattedDate
                    },
                    label: (ctx: any) => {
                        const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)
                        const formattedValue = new Intl.NumberFormat('en-US', {
                            maximumFractionDigits: (ctx.raw > 0.01) ? 3 : 7
                        }).format(ctx.raw)
                        return `${capitalizeFirstLetter(dataType)}: ${currency.symbol + formattedValue}`;
                    },
                    
                }
            },
            crosshair: {
                line: {
                  color: '#50433D',
                  width: 1,
                  dashPattern: [5, 5]
                },
                sync: {
                    enabled: true
                },
                zoom: {
                    enabled: false,
                },
                snap: {
                    enabled: true
                }
            },
            hover: {
                intersect: false
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                type: chartType,
                ticks: {
                   callback: (value: number, index: number, values: number[]) => {
                       const intlFormat = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: currency.name,
                        }).format(value)
                        return intlFormat
                    },
                    color: '#7F6F68'
                },
            },
            x: {
                offset: false,
                type: 'time',
                time: {
                    unit: (days === 1 || days === 7 || days === 30 || days === 90) ? 'day' : 'month'
                },
                ticks: {
                    color: '#7F6F68',
                    maxTicksLimit: 10,
                    maxRotation: 0,
                },
                grid: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: false,
                    drawTicks: true,
                    color: '#A49792'
                }
            }
        }
    }
    
    const handleChartTypeChangeClick = () => {
        if (chartType === 'linear') setChartType('logarithmic')
        if (chartType === 'logarithmic') setChartType('linear')
    }

   

    return (
        <StyledChart className='Chart' days={days} chartType={chartType} dataType={dataType}>
            <h2 className="Chart-title Chart-title-origin">{symbol.toUpperCase()} Chart</h2>
            <div className="Chart-upper">
                <h2 className="Chart-title Chart-title-upper">{symbol.toUpperCase()} Chart</h2>
                <div className="Chart-setting Chart-setting-chart">
                    <ul className="Chart-setting-list">
                        <li><button className={`Chart-setting-button-${dataType === 'price' ? 'active' : 'inactive'}`} onClick={() => setDataType('price')}>price</button></li>
                        <li><button className={`Chart-setting-button-${dataType === 'market_cap' ? 'active' : 'inactive'}`} onClick={() => setDataType('market_cap')}>market&nbsp;cap</button></li>
                        <li><button className={`Chart-setting-button-${dataType === 'volume' ? 'active' : 'inactive'}`} onClick={() => setDataType('volume')}>volume</button></li>
                    </ul>
                </div>
                <div className="Chart-setting Chart-setting-data">
                    <button 
                        className={`Chart-setting-button-${chartType === 'logarithmic' ? 'active' : 'inactive'}`}
                        onClick={handleChartTypeChangeClick}>
                            logarithmic
                    </button>
                </div>
            </div>
            {isSuccess ? <Line data={getChartData()} options={options}/> : ''}
            <div className="Chart-setting Chart-setting-time">
                <ul className="Chart-setting-list">
                    <li><button className={`Chart-setting-button-${days === 1 ? 'active' : 'inactive'}`} onClick={() => setDays(1)}>24h</button></li>
                    <li><button className={`Chart-setting-button-${days === 7 ? 'active' : 'inactive'}`} onClick={() => setDays(7)}>7d</button></li>
                    <li><button className={`Chart-setting-button-${days === 30 ? 'active' : 'inactive'}`} onClick={() => setDays(30)}>1m</button></li>
                    <li><button className={`Chart-setting-button-${days === 90 ? 'active' : 'inactive'}`} onClick={() => setDays(90)}>3m</button></li>
                    <li><button className={`Chart-setting-button-${days === 180 ? 'active' : 'inactive'}`} onClick={() => setDays(180)}>6m</button></li>
                    <li><button className={`Chart-setting-button-${days === 365 ? 'active' : 'inactive'}`} onClick={() => setDays(365)}>1y</button></li>
                    <li><button className={`Chart-setting-button-${days === 1095 ? 'active' : 'inactive'}`} onClick={() => setDays(1095)}>3y</button></li>
                    <li><button className={`Chart-setting-button-${days === 'max' ? 'active' : 'inactive'}`} onClick={() => setDays('max')}>max</button></li>
                </ul>
            </div>
        </StyledChart>
    )
}

const StyledChart = styled.div<StyledChartProps>`
    .Chart {
        position: relative;
        &-title {
            font-size: ${props => props.theme.font.size.beta};
            font-weight: ${props => props.theme.font.weight.alpha};
            margin-bottom: ${props => props.theme.space.eta};
            &-origin {
                display: block;
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    display: none;
                }
            }
            &-upper {
                display: none;
                @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
                    display: block;
                }
            }
        }
        &-upper {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &-setting {
            &-time {
                margin-top: ${props => props.theme.space.zeta};
                display: flex;
                align-items: center;
                flex-direction: column;
                & > * {
                    text-transform: uppercase;
                }
                
            }
            &-data {
                display: inline-block;
                text-transform: capitalize;
                background-color: ${props => props.theme.color.eta};
                border: 1px solid ${props => props.theme.color.epsilon};
                border-radius: ${props => props.theme.space.theta};
            }
            &-chart {
                text-transform: capitalize;
                
            }
            &-list {
                display: inline-flex;
                background-color: ${props => props.theme.color.eta};
                border: 1px solid ${props => props.theme.color.epsilon};
                border-radius: ${props => props.theme.space.theta};
                
            }
            &-button {
                &-active, &-inactive {
                    font-size: ${props => props.theme.font.size.delta};
                    @media screen and (min-width: ${props => props.theme.breakpoint.epsilon}) {
                        font-size: ${props => props.theme.font.size.gamma};
                    }
                    padding: ${props => props.theme.space.eta} ${props => props.theme.space.zeta};
                    border-radius: ${props => props.theme.space.theta};
                }
                &-inactive {
                    color: ${props => props.theme.color.beta};
                    background-color: ${props => props.theme.color.zeta};
                    &:hover {
                        background-color: ${props => props.theme.color.epsilon};
                    }
                }
                &-active {
                    background-color: ${props => props.theme.color.beta};
                    color: ${props => props.theme.color.eta};
                    &:hover {
                        background-color: ${props => props.theme.color.gamma};
                    }
                }
                
            }
            
            
        
        }
    }
`

export default Chart