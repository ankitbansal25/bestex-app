import { Table } from 'react-bootstrap'
import { Order } from '../../../models/order'
import OrderActionMenu from './OrderActionMenu'
import { ParentOrder } from '../../../models/parentorder'
import './OrderList.css'

/**
 * OrderList Component
 */
export default function OrderList({
    data,
    actions,
    handleOrderAction,
}: OrderListProps) {
    const handleRemainingQuantity = (order: Order) => {
        if ((order as ParentOrder).remainingQuantity === undefined) {
            return <td className="OrderListData">{order.quantity}</td>
        } else {
            return (
                <td className="OrderListData">
                    {order.quantity - (order as ParentOrder).remainingQuantity}/
                    {order.quantity}
                </td>
            )
        }
    }

    return (
        <Table
            style={{ width: '-webkit-fill-available' }}
            striped
            bordered
            hover
            size="sm"
        >
            <thead>
                <tr>
                    <th className="OrderListHeading">Order Id</th>
                    <th className="OrderListHeading">Symbol</th>
                    <th className="OrderListHeading">Price</th>
                    <th className="OrderListHeading">Quantity</th>
                    <th className="OrderListHeading">Side</th>
                    <th className="OrderListHeading">Order Status</th>
                    {actions && actions.length > 0 && (
                        <th className="OrderListHeading">Action</th>
                    )}
                </tr>
            </thead>
            {data.map((item, index) => {
                return (
                    <tbody key={index} style={{ textAlign: 'center' }}>
                        <tr>
                            <td className="OrderListData">{item.orderId}</td>
                            <td className="OrderListData">{item.symbol}</td>
                            <td className="OrderListData">{item.price}</td>
                            {handleRemainingQuantity(item)}
                            <td className="OrderListData">{item.side}</td>
                            <td className="OrderListData">
                                {item.orderStatus}
                            </td>
                            {actions && actions.length > 0 && (
                                <td className="OrderListData">
                                    <OrderActionMenu
                                        data={item}
                                        actions={actions}
                                        handleMenuItemClick={handleOrderAction}
                                    ></OrderActionMenu>
                                </td>
                            )}
                        </tr>
                    </tbody>
                )
            })}
        </Table>
    )
}

/**
 * OrderList Component Props
 */
interface OrderListProps {
    data: Array<Order>
    actions: Array<string>
    handleOrderAction: (order: Order, action: string) => void
}
