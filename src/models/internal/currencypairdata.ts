export default interface CurrencyPairData {
    id: string;
    name: string;
    closePrice: number;
    updatePrice: number;
    percentChange: number;
    actualChange: number;
    tickSize: number;
    maxFactorX: number;
  }