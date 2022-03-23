import { SetStateAction } from "react";
import { SupportedCurrencies, ListApiPageOrder } from "./helper";

type SupportedSymbols = '$' | '€' | 'CHF' | '¥' | '£' | 'Ξ' | '₿'
type SupportedCurrencies = "btc" | "eth" | "ltc" | "bch" | "bnb" | "eos" | "xrp" | "xlm" | "link" | "dot" | "yfi" | "usd" | "aed" | "ars" | "aud" | "bdt" | "bhd" | "bmd" | "brl" | "cad" | "chf" | "clp" | "cny" | "czk" | "dkk" | "eur" | "gbp" | "hkd" | "huf" | "idr" | "ils" | "inr" | "jpy" | "krw" | "kwd" | "lkr" | "mmk" | "mxn" | "myr" | "ngn" | "nok" | "nzd" | "php" | "pkr" | "pln" | "rub" | "sar" | "sek" | "sgd" | "thb" | "try" | "twd" | "uah" | "vef" | "vnd" | "zar" | "xdr" | "xag" | "xau" | "bits" | "sats";
export type ListApiOrder = "market_cap_desc" | "volume_desc"
export type ListApiPriceChange = '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | '1y'

export interface ListApiSettings {
    currency: SupportedCurrencies,
    order: ListApiOrder,
    pageNumber: number,
    priceChange: ListApiPriceChange
}

export interface ChartApiSettings {
    coin: string
    currency: SupportedCurrencies,
    days: number | 'max'
}



export interface ApiSettings {
    currency: {
        name: SupportedCurrencies,
        symbol: SupportedSymbols
    }
    list: Omit<ListApiSettings, "currency">
}