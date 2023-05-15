import {useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import ParentOrderContainer from './ParentOrderContainer'
import ChildOrderContainer from './ChildOrderContainer';
import PositionsContainer from './PositionsContainer';
import { Order, OrderStatus } from '../../../models/order';
import { getOrders } from '../../../apis/orderapi';
import { ParentOrder } from '../../../models/parentorder';
import { ChildOrder } from '../../../models/childorder';

export type OrderContainerHandle = {
  addNewOrder: (order: Order) => void;
} 

function createSymbolTradedQuantityMap(data: Array<Order | ParentOrder>) {
  let map = new Map<string, QuantityPrice>();
  data.forEach((order: Order) => {
    if (map.has(order.symbol)) {
      let prevQuantityPriceValue = map.get(order.symbol);
      if (prevQuantityPriceValue !== undefined) {
        map.set(order.symbol,
          {
            totalTradedQuantity: prevQuantityPriceValue.totalTradedQuantity + order.quantity,
            totalPrice: prevQuantityPriceValue.totalPrice + order.price,
            totalCount: prevQuantityPriceValue.totalCount + 1
          });
      }
    } else {
      map.set(order.symbol, { totalTradedQuantity: order.quantity, totalPrice: order.price, totalCount: 1 });
    }
  });
  return map;
}

const OrderContainer = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
      addNewOrder(order: Order){

        const newParentOrder: ParentOrder = {
          orderId: order.orderId,
          symbol: order.symbol,
          side: order.side,
          quantity: order.quantity,
          price: order.price,
          orderStatus: order.orderStatus,
          spreadCost: 0,
          tradedQuantity: 0,
          remainingQuantity: order.quantity, // same as quantity initially
          childOrders: []
        }

        const allParentOrders = [...parentOrders, newParentOrder];
        const map = createSymbolTradedQuantityMap(allParentOrders);

        allParentOrders.forEach((order: ParentOrder) => {
          order.tradedQuantity = map.get(order.symbol)?.totalTradedQuantity || 0;
          return order;
        })

        symbolTradedQuantityMap.current = map;
        setParentOrders(allParentOrders);
      }
  }));

  const [navindex, setNavIndex] = useState(0);
  const [parentOrders, setParentOrders] = useState<Array<ParentOrder>>([]);
  const [selectedParentOrder, setSelectedParentOrder] = useState<ParentOrder | undefined>(undefined);

  const symbolTradedQuantityMap = useRef<Map<string, QuantityPrice>>(new Map<string, QuantityPrice>());

  const handleItemClick = (index: number) => {
    setNavIndex(index);
  }

  const onSuccessFetchOrders = (data: Array<ParentOrder>) => {
     let map = createSymbolTradedQuantityMap(data);

    const parentOrders: Array<ParentOrder>  = data.map((order: ParentOrder) => {
      return {
        orderId: order.orderId,
        symbol: order.symbol,
        side: order.side,
        quantity: order.quantity,
        price: order.price,
        orderStatus: order.orderStatus,
        tradedQuantity: map.get(order.symbol)?.totalTradedQuantity || 0,
        remainingQuantity: order.remainingQuantity,
        childOrders: order.childOrders,
        spreadCost: 0
      }
    }); 
    
    symbolTradedQuantityMap.current = map;
    setParentOrders([...parentOrders]);
  };


  useEffect(() => {
     getOrders(onSuccessFetchOrders);
  }, []);


  const onCancelOrder = (order: Order) => {
     const newParentOrders = parentOrders.map((parentOrder: ParentOrder) => {
      if(parentOrder.orderId === order.orderId){
        if(parentOrder.orderStatus !== OrderStatus.Open){
          alert(`Cannot cancel ${parentOrder.orderStatus} order !!`);
          return parentOrder;
        }
        parentOrder.orderStatus = OrderStatus.Cancelled;
      }
      return parentOrder;
     });
     setParentOrders([...newParentOrders]);
  }

  const navigateToChildOrders = (order: Order) => {
    let parentOrder = parentOrders.filter((parentOrder: ParentOrder) => parentOrder.orderId === order.orderId);
    setSelectedParentOrder(parentOrder[0]);
    setNavIndex(1);
  }

  const handleAddChildOrder = (order: Order, parentOrderId: string) => {
    const childOrder: ChildOrder = {
      parentOrderId: parentOrderId,
      ...order
    }
    const newParentOrders = parentOrders.map((parentOrder: ParentOrder) => {
      if(parentOrder.orderId === parentOrderId){
        if(parentOrder.childOrders === undefined){
          parentOrder.childOrders = [];
        }
        parentOrder.childOrders.push(childOrder);
        parentOrder.remainingQuantity = parentOrder.remainingQuantity - childOrder.quantity;
      }
      return parentOrder;
    });
    setParentOrders([...newParentOrders]);
  }

    return (
      <div style={{flex:4}}>
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <div style= {{ background: navindex===0 ? 'gray': 'white' , display: 'flex', justifyContent: 'center', border:"1px solid black", flex: 1,padding: '16px'}} onClick={()=> handleItemClick(0)}>Parent Orders</div>
          <div style= {{background: navindex===1 ? 'gray': 'white',display: 'flex', justifyContent: 'center', border:"1px solid black", flex: 1, padding: '16px'}} onClick={()=> handleItemClick(1)}>Child Orders</div>
          <div style= {{background: navindex===2 ? 'gray': 'white', display: 'flex', justifyContent: 'center', border:"1px solid black", flex: 1, padding: '16px'}} onClick={()=> handleItemClick(2)}>Positions</div>
        </div>
        <div>
          { navindex === 0 ? <ParentOrderContainer orders = {parentOrders} navToChildOrders = {(order)=> navigateToChildOrders(order)} addChildOrder={handleAddChildOrder} cancelOrder={(order)=> onCancelOrder(order)}/> : null }
          { navindex === 1 ? <ChildOrderContainer orders={ selectedParentOrder?.childOrders ? selectedParentOrder?.childOrders: [] }/> : null }
          { navindex === 2 ? <PositionsContainer dataMap={symbolTradedQuantityMap.current} /> : null}
        </div>
      </div>
      </div>
    )
  })


  export type QuantityPrice = {
    totalTradedQuantity: number;
    totalPrice: number;
    totalCount: number;
  }

  export default OrderContainer;

