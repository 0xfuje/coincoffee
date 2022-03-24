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
    Legend
} from 'chart.js'
import { useState } from "react"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    LineController,
    Legend
)

interface ChartProps {
    symbol: string,
    id: string
}

function Chart({symbol, id}: ChartProps) {
    const [days, setDays] = useState<number>(100)
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
            tension: 0.2,
            pointRadius: 0,
        }],
    }
    const options = {
        plugins: {
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