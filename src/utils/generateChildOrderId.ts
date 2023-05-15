import { ParentOrder } from '../models/parentorder'

/**
 * Generates a child order id for a given parent order
 * @param order Parent Order
 */
export default function generateChildOrderId(order: ParentOrder) {
    let parentId = order.orderId
    let childOrders = order.childOrders
    if (childOrders === undefined || childOrders.length === 0) {
        return parentId + '-1'
    } else {
        return parentId + '-' + (childOrders.length + 1)
    }
}
