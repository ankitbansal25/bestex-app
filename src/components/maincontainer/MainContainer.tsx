import React, { useRef } from 'react'
import { Order } from '../../models/order'
import WatchList from './WatchList'
import OrderContainer, {
    OrderContainerHandle,
} from './ordercontainer/OrderContainer'
import './MainContainer.css'

/**
 * MainContainer Component
 */
export default function MainContainer() {
    const childAddOrderRef = useRef<OrderContainerHandle>(null)
    const handleAddOrder = (order: Order) => {
        if (childAddOrderRef.current)
            childAddOrderRef.current.addNewOrder(order)
    }

    return (
        <div className="MainContainer">
            <WatchList
                onAddOrder={(order) => handleAddOrder(order)}
            ></WatchList>
            <OrderContainer ref={childAddOrderRef}></OrderContainer>
        </div>
    )
}
