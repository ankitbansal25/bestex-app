import { Order } from "./order";

export type ParentOrder = Order & {
    tradedQuantity?: number,
    spreadCost?: number,
    remainingQuantity: number,
    childOrders?: Array<Order>
}