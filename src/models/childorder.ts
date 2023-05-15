import { Order } from "./order";

export type ChildOrder = Order & {
    parentOrderId: string
}