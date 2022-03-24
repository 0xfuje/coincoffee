export const convertNum = (num: number) => {
    const trillion = 1000000000000
    const billion = 1000000000
    const million = 1000000
    if (num > trillion) return `${(num / trillion).toFixed(2)}T`
    if (num > billion) return `${(num / billion).toFixed(2)}B`
    if (num > million) return `${(num / million).toFixed(2)}M`
    if (num < million) return num;
}

export const convertColor = (num: number) => {
    if (num >= 0) return 'green'
    if (num < 0) return 'red'
}