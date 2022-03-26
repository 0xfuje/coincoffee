import styled from "styled-components"
import { Line } from 'react-chartjs-2'
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { useGetChartQuery } from "../../slices/api/apiSlice"
import { DateTime } from 'luxon'
import { SupportedCurrencies } from "../../types"
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
    LogarithmicScale
} from 'chart.js'
import  CrosshairPlugin, { Interpolate } from 'chartjs-plugin-crosshair'
import { useEffect, useState } from "react"
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
    LogarithmicScale
)

interface ChartProps {
    symbol: string,
    id: string
}

type Days = 1 | 7 | 30 | 90 | 180 | 365 | 1095 | 'max'
type ChartType = 'logarithmic' | 'linear'
type DataType = 'price' | 'volume' | 'market_cap'


function Chart({symbol, id}: ChartProps) {
    const [days, setDays] = useState<Days>(90)
    const [dataSet, setDataSet] = useState<number[]>()
    const [chartType, setChartType] = useState<ChartType>('linear')
    const [dataType, setDataType] = useState<DataType>('price')
    

    useEffect(() => {
        if (dataType === 'price') setDataSet(price.data)
        if (dataType === 'volume') setDataSet(volume.data)
        if (dataType === 'market_cap') setDataSet(market_cap.data)
    }, [dataType])

    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings
    const { 
        data: rawChartData,
        isFetching,
        isSuccess
    } = useGetChartQuery({coin: id, currency: currency.name, days})
    
    // Custom chart from controller
    
    const getDates = (array: undefined | Array<number[]>) => {
        if (array === undefined) return;
        const dates = array.map((data: number[]) => {
            const iso = new Date(data[0]).toISOString()
            const dt = DateTime.fromISO(iso)
            const format = dt.toLocaleString({ year: 'numeric', month: 'short', day: 'numeric'})
            return format
        })
        return dates;
    }

    const getData = (array: undefined | Array<number[]>) => {
        let dates: string[] = []
        let data: number[] = []
        if (array === undefined || isFetching) return { dates, data };
        dates = array.map((data: number[]) => {
            const iso = new Date(data[0]).toISOString()
            const dt = DateTime.fromISO(iso)
            const format = dt.toLocaleString({ year: 'numeric', month: 'short', day: 'numeric'})
            return format
        })
        data = array.map((data: number[]) => data[1]);
        return { dates, data }
    }
    
    

    const price = getData(rawChartData?.prices)
    const volume = getData(rawChartData?.total_volumes)
    const market_cap = getData(rawChartData?.market_caps)

    

    const data = {
        labels: price.dates,
        datasets: [
        {
            data: dataSet,
            borderColor: '#7F6F68',
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            yAxisId: 'y'
        },

    ],
    }
    const options = {
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                position: 'average',
                backgroundColor: '#F3F2F1',
                titleColor: '#50433D',
                bodyColor: '#50433D',
                padding: 10,
                borderColor: '#D1C9C7',
                borderWidth: 1,
                callbacks: {
                    label: (ctx: any) => {
                        console.log(ctx);
                        return `Price: ${currency.symbol + ctx.formattedValue}`;
                    },
                    afterLabel: (ctx: any) => {
                        return 
                    }
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
        responsive: true,
        scales: {
            y: {
                type: chartType,
                ticks: {
                    callback: function(value: any, index: any, ticks: any) {
                        return '$' + value
                    }
                },
            },
            x: {
                ticks: {
                   maxTicksLimit: 10,
                },
                grid: {
                    display: false
                }
            }
        }
    }
    
    const handleChartTypeChangeClick = () => {
        if (chartType === 'linear') setChartType('logarithmic')
        if (chartType === 'logarithmic') setChartType('linear')
    }

    return (
            <StyledChart className='Chart'>
                <h2 className="Chart-title">{symbol.toUpperCase()} Price Chart</h2>
                <div className="Chart-settigns">
                    <div className="Chart-settings-time">
                        <a onClick={() => setDays(1)}>24h</a>
                        <a onClick={() => setDays(7)}>7d</a>
                        <a onClick={() => setDays(30)}>1m</a>
                        <a onClick={() => setDays(90)}>3m</a>
                        <a onClick={() => setDays(180)}>6m</a>
                        <a onClick={() => setDays(365)}>1y</a>
                        <a onClick={() => setDays(1095)}>3y</a>
                        <a onClick={() => setDays('max')}>max</a>
                    </div>
                    <a  className="Chart-settings-log" onClick={handleChartTypeChangeClick}>log</a>
                    <div className="Chart-settings-time">
                        <a onClick={() => setDataType('price')}>price</a>
                        <a onClick={() => setDataType('market_cap')}>market cap</a>
                        <a onClick={() => setDataType('volume')}>volume</a>
                    </div>
                </div>
                {isSuccess ? <Line data={data} options={options} /> : ''}
            </StyledChart>
    )
}

const StyledChart = styled.div`
    .Chart {
        position: relative;
        &-title {
            font-size: ${props => props.theme.font.size.beta};
            font-weight: ${props => props.theme.font.weight.alpha};
            margin-bottom: ${props => props.theme.space.eta};
        }
    }
`

export default Chart