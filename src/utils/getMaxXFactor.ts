import { CurrencyPair } from '../models/currencypair'
import { CurrencyPairCircuitLimits, CurrnecyPairTickSizes } from './constants'

/**
 * Get Max X Factor
 * @param currencyPair Currency Pair 
 * @returns Max X Factor
 */
export default function getMaxXFactor(currencyPair: CurrencyPair): number {
    const maxDiff =
        Number(currencyPair.value) * CurrencyPairCircuitLimits.upperLimit
    const tickSize =
        CurrnecyPairTickSizes[
            currencyPair.id as keyof typeof CurrnecyPairTickSizes
        ]
    return Math.floor(maxDiff / tickSize)
}
