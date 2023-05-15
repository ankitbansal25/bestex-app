import { Order } from '../../../models/order'
import OrderList from './OrderList'

/**
 * ChildOrderContainer Component
 */
export default function ChildOrderContainer({
    orders,
}: ChildOrderContainerProps) {
    return (
        <OrderList
            data={orders}
            actions={[]}
            handleOrderAction={() => {}}
        ></OrderList>
    )
}

/**
 * ChildOrderContainer Component Props
 */
interface ChildOrderContainerProps {
    orders: Array<Order>
}
