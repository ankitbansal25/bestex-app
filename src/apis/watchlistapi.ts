import { MockCurrencyPairs } from '../mock/data'
import { CurrencyPair } from '../models/currencypair'

/**
 * Get last day currency pair close prices
 *
 * @param onSuccess onSuccess callback
 * @param onError onError callback
 */
export async function getLastDayCurrencyPairClosePrices(
    onSuccess: (data: Array<CurrencyPair>) => void,
    onError?: (error: any) => void
) {
    fetchLastDayCurrencyPairClosePrices()
        .then((data) => {
            onSuccess(data)
        })
        .catch((error) => {
            onError && onError(error)
        })
}

/**
 * Fetch last day currency pair close prices
 * @returns {Promise<Array<CurrencyPair>>}
 */
function fetchLastDayCurrencyPairClosePrices(): Promise<Array<CurrencyPair>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(MockCurrencyPairs)
        }, 1000)
    })
}
