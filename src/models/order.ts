export interface Order {
    orderId: string, 
    symbol: string,
    price: number,
    quantity: number,
    side: Side,
    orderStatus: OrderStatus,
}

export enum Side {
    Buy ="Buy",
    Sell="Sell"
}

export enum OrderStatus {
    Open = "Open",
    PartialFill = "Partial",
    CompleteFill = "Completed", // final state
    Cancelled = "Cancelled", // final state
    Rejected = "Rejected" // final state
}