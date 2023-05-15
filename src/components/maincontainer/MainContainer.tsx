import React, { useRef } from "react";
import { Order } from "../../models/order";
import WatchList from "./WatchList";
import OrderContainer, { OrderContainerHandle } from "./ordercontainer/OrderContainer";

export default function MainContainer(){
  const childAddOrderRef = useRef<OrderContainerHandle>(null);
  const handleAddOrder = (order: Order) => {
    if(childAddOrderRef.current)
    childAddOrderRef.current.addNewOrder(order);
  }
  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '500px'}}>
        <WatchList onAddOrder = {(order)=> handleAddOrder(order)}></WatchList>
        <OrderContainer ref={childAddOrderRef}></OrderContainer>
    </div>
  )
}
