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
import { useState } from "react"
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
type Days = 1 | 7 | 30 | 90 | 180 | 365
type ChartType = 'logarithmic' | 'linear'
type DataType = 'price' | 'volume' | 'market_cap'

function Chart({symbol, id}: ChartProps) {
    const [days, setDays] = useState<Days>(90)
    const [chartType, setChartType] = useState<ChartType>('linear')
    const [dataType, setDataType] = useState<DataType>('price')

    const [labels, setLabels] = useState()
    const [dataset, setDataset] = useState()

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
        if (array === undefined) return;
        const dates = array.map((data: number[]) => {
            const iso = new Date(data[0]).toISOString()
            const dt = DateTime.fromISO(iso)
            const format = dt.toLocaleString({ year: 'numeric', month: 'short', day: 'numeric'})
            return format
        })
        const data = array.map((data: number[]) => data[1]);
        return { dates, data }
    }
    
    const prices = getData(rawChartData?.prices)
    const volumes = getData(rawChartData?.total_volumes)
    const marketcaps = getData(rawChartData?.market_caps)


    const data = {
        labels: prices.dates,
        datasets: [{
            data: prices.data,
            borderColor: '#7F6F68',
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0.1
        }],
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
                borderWidth: 1
            },
            crosshair: {
                line: {
                  color: '#50433D',  // crosshair line color
                  width: 1,        // crosshair line width
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
    return (
            <StyledChart className='Chart'>
                <h2 className="Chart-title">{symbol.toUpperCase()} Price Chart</h2>
                {isSuccess ? <Line data={data} options={options} /> : ''}
            </StyledChart>
    )
}

const StyledChart = styled.div`
    .Chart {
        &-title {
            font-size: ${props => props.theme.font.size.beta};
            font-weight: ${props => props.theme.font.weight.alpha};
            margin-bottom: ${props => props.theme.space.eta};
        }
    }
`

export default Chart