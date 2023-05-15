import { MockOrderData } from '../mock/data'
import { ParentOrder } from '../models/parentorder'

/**
 * Get Parent Orders
 * @param onSuccess onSuccess Callback
 * @param onError onError Callback
 */
export async function getOrders(
    onSuccess: (data: Array<ParentOrder>) => void,
    onError?: (error: any) => void
) {
    fetchOrders()
        .then((data) => {
            onSuccess(data)
        })
        .catch((error) => {
            onError && onError(error)
        })
}

/**
 * Fetch Parent Orders
 * @returns {Promise<Array<ParentOrder>>}
 */
function fetchOrders(): Promise<Array<ParentOrder>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(MockOrderData)
        }, 1000)
    })
}
