import { CurrencyPair } from "../models/currencypair"
import { ParentOrder } from "../models/parentorder";
import { OrderStatus, Side } from "../models/order";

export const MockUser = {
    name: 'Mock User',
    id: '1234567890',
    email: 'mock@mock.com'
}

export const MockCurrencyPairs: Array<CurrencyPair> = [
    {
        id: 'USDINR',
        name: 'USDINR',
        value: '82.5500'
    },
    {
        id: 'USDCHN',
        name: 'USDCHN',
        value: '6.88650'
    },
    {
        id: 'EURUSD',
        name: 'EURUSD',
        value: '1.06641'
    },
    {
        id: 'USDJPY',
        name: 'USDJPY',
        value: '131.830'
    },
     {
        id: 'USDGBP',
        name: 'USDGBP',
        value: '0.82122'
    }
]

export const MockOrderData: Array<ParentOrder> = [
    {
        orderId: "BX00000",
        symbol: "USDINR",
        price: 82.5700,
        quantity: 100,
        side: Side.Buy,
        orderStatus: OrderStatus.Open,
        remainingQuantity: 100,
    },
    {
        orderId: "BX00001",
        symbol: "USDCHN",
        price: 6.689,
        quantity: 500,
        side: Side.Buy,
        orderStatus: OrderStatus.PartialFill,
        remainingQuantity: 400,
        childOrders: [
            {
                orderId: "BX00001-1",
                symbol: "USDCHN",
                price: 6.689,
                quantity: 100,
                side: Side.Buy,
                orderStatus: OrderStatus.Open,
            }
        ]
    },
    {
        orderId: "BX00002",
        symbol: "USDJPY",
        price: 130.86,
        quantity: 1000,
        side: Side.Sell,
        orderStatus: OrderStatus.PartialFill,
        remainingQuantity: 800,
        childOrders: [
            {
                orderId: "BX00002-1",
                symbol: "USDJPY",
                price: 130.86,
                quantity: 100,
                side: Side.Sell,
                orderStatus: OrderStatus.Open,
            },
            {
                orderId: "BX00002-2",
                symbol: "USDJPY",
                price: 130.86,
                quantity: 100,
                side: Side.Sell,
                orderStatus: OrderStatus.Open,
            }
        ]
    },
]
