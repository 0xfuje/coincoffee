import { ListApiOrder } from "../api/settings";
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