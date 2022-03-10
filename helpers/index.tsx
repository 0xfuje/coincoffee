export const convertNum = (num: number) => {
    const billion = 1000000000
    const million = 1000000
    if (num > billion) return `${(num / billion).toFixed(2)}B`
    if (num > million) return `${(num / million).toFixed(2)}M`
}