import { ParentOrder } from '../../../models/parentorder'
import { Order } from '../../../models/order'
import SimpleDialog from '../../common/SimpleDialog'
import OrderList from './OrderList'
import React, { useState } from 'react'
import ExecuteOrderDialogContent from '../dialogs/ExecuteOrderDialogContent'
import CancelOrderDialogContent from '../dialogs/CancelOrderDialogContent'

// Order Actions
const OrderActions = ['Execute Order', 'Show Child Orders', 'Cancel Order']

/**
 * ParentOrderContainer Component
 */
export default function ParentOrderContainer({
    orders,
    navToChildOrders,
    addChildOrder,
    cancelOrder,
}: ParentOrderContainerProps) {
    const [executeOrderDialogOpen, setExecuteOrderDialogOpen] = useState(false)
    const [cancelOrderDialogOpen, setCancelOrderDialogOpen] = useState(false)
    const [order, setOrder] = useState<Order>()

    const handleOrderAction = (order: Order, action: string) => {
        switch (action) {
            case 'Execute Order':
                handleExecuteOrder(order)
                break
            case 'Show Child Orders':
                handleShowChildOrders(order)
                break
            case 'Cancel Order':
                handleCancelOrder(order)
                break
        }
    }

    // Handle Execute Order Action
    const handleExecuteOrder = (order: Order) => {
        setExecuteOrderDialogOpen(true)
        setOrder(order)
    }

    // Handle Show Child Orders Action
    const handleShowChildOrders = (order: Order) => {
        navToChildOrders(order)
    }

    // Handle Cancel Order Action
    const handleCancelOrder = (order: Order) => {
        setCancelOrderDialogOpen(true)
        setOrder(order)
    }

    // Execute Order Dialog - Handle Submit Button
    const onSubmitOrder = (childOrder: Order) => {
        if (order === undefined) {
            alert('Something went wrong! Try again.')
            return
        }
        addChildOrder(childOrder, order.orderId)
        handleClose()
    }

    // Cancel Order Dialog - Handle Yes Button
    const onCancelOrder = (order: Order) => {
        cancelOrder(order)
        handleClose()
    }

    // Close Dialog
    const handleClose = () => {
        setExecuteOrderDialogOpen(false)
        setCancelOrderDialogOpen(false)
    }

    return (
        <>
            <OrderList
                data={orders}
                actions={OrderActions}
                handleOrderAction={handleOrderAction}
            ></OrderList>
            {order && (
                <SimpleDialog
                    title={'Execute Order'}
                    open={executeOrderDialogOpen}
                    onClose={() => handleClose()}
                    dialogContent={
                        <ExecuteOrderDialogContent
                            order={order}
                            onSubmitOrder={onSubmitOrder}
                            onCancel={handleClose}
                        ></ExecuteOrderDialogContent>
                    }
                ></SimpleDialog>
            )}
            {order && (
                <SimpleDialog
                    title={'Cancel Order'}
                    open={cancelOrderDialogOpen}
                    onClose={() => handleClose()}
                    dialogContent={
                        <CancelOrderDialogContent
                            order={order}
                            onCancelOrder={onCancelOrder}
                            onCancel={handleClose}
                        ></CancelOrderDialogContent>
                    }
                ></SimpleDialog>
            )}
        </>
    )
}

/**
 * ParentOrderContainerProps
 */
interface ParentOrderContainerProps {
    orders: Array<ParentOrder>
    navToChildOrders: (order: Order) => void
    addChildOrder: (order: Order, parentOrderId: string) => void
    cancelOrder: (order: Order) => void
}
