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
    Legend} from 'chart.js'
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
    CrosshairPlugin
)

interface ChartProps {
    symbol: string,
    id: string
}

function Chart({symbol, id}: ChartProps) {
    const [days, setDays] = useState<number>(90)
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings
    const { 
        data: rawChartData,
        isFetching,
        isSuccess
    } = useGetChartQuery({coin: id, currency: currency.name, days})
    
    // Custom chart from controller
    

    const times = rawChartData?.prices.map((c) => {
        const iso = new Date(c[0]).toISOString()
        const dt = DateTime.fromISO(iso)
        const format = dt.toLocaleString()
        return format;
    })
    const values = rawChartData?.prices.map((c) => `${c[1]}`);
    console.log(times, values)

    const data = {
        labels: times,
        datasets: [{

            data: values,
            borderColor: '#50433D',
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
            },
            crosshair: {
                line: {
                  color: '50433D',  // crosshair line color
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
                ticks: {
                    callback: function(value: any, index: any, ticks: any) {
                        return '$' + value
                    }
                },
            },
            x: {
                ticks: {
                   maxTicksLimit: 20,
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
                <Line data={data} options={options} />
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