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
    Legend
} from 'chart.js'
import { useState } from "react"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface ChartProps {
    symbol: string,
    currency: SupportedCurrencies
}

function Chart({symbol}: ChartProps) {
    const [days, setDays] = useState<number>(100)
    const pageSettings = useAppSelector((state: RootState) => state.apiSettings)
    const { currency } = pageSettings
    const { 
        data: rawChartData,
        isFetching,
        isSuccess
    } = useGetChartQuery({coin: symbol, currency: currency.name, days})
    
    console.log(rawChartData)

    const pricesTime = rawChartData?.prices.map((c) => {
        const iso = new Date(c[0]).toISOString()
        const dt = DateTime.fromISO(iso)
        const format = dt.toLocaleString()
        return format;
    })
    console.log(pricesTime)

    const data = {
        labels: ['hey', 'iam', 'feeling', 'shit', 'like', 'no'],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 62, 40],
            fill: false,
            borderColor: '#000000',
            tension: 0.1
        }]
    }
    return (
            <StyledChart className='Chart'>
                <Line data={data} />
            </StyledChart>
    )
}

const StyledChart = styled.div`

`

export default Chart