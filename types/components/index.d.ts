import { ListApiOrder, SupportedCurrencies, ListApiPriceChange } from "../api/settings";
export interface CoinProps {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap?:                      number;
    total_volume?:                    number;
    market_cap_rank:                  number;
    price_change_percentage:          string;
    order:                      ListApiOrder;
}

export interface PageSettingsProps {
    setCurrency: (currency: SupportedCurrencies) => any
    setOrder: (order: ListApiOrder) => any
    setPriceChange: (priceChange: ListApiPriceChange) => any
    currency: SupportedCurrencies
    order: ListApiOrder
    priceChange: ListApiPriceChange
}