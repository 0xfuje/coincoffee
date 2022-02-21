import { SupportedCurrencies, ListApiPageOrder } from "./helper";

type SupportedCurrencies = "btc" | "eth" | "ltc" | "bch" | "bnb" | "eos" | "xrp" | "xlm" | "link" | "dot" | "yfi" | "usd" | "aed" | "ars" | "aud" | "bdt" | "bhd" | "bmd" | "brl" | "cad" | "chf" | "clp" | "cny" | "czk" | "dkk" | "eur" | "gbp" | "hkd" | "huf" | "idr" | "ils" | "inr" | "jpy" | "krw" | "kwd" | "lkr" | "mmk" | "mxn" | "myr" | "ngn" | "nok" | "nzd" | "php" | "pkr" | "pln" | "rub" | "sar" | "sek" | "sgd" | "thb" | "try" | "twd" | "uah" | "vef" | "vnd" | "zar" | "xdr" | "xag" | "xau" | "bits" | "sats";
export type ListApiOrder = "market_cap_desc" | "market_cap_asc" | "volume_asc" | "volume_desc"
export type ListApiPriceChange = '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | '1y'

export interface ListApiInput {
    currency: SupportedCurrencies,
    order: ListApiOrder,
    pageNumber: number,
    priceChange: ListApiPriceChange
}

export interface ChartApiInput {
    coin: string,
    currency: SupportedCurrencies,
    days: number | 'max'
}