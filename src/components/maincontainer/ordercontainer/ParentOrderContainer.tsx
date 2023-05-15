import { ParentOrder } from "../../../models/parentorder";
import { Order } from "../../../models/order";
import SimpleDialog from "../../SimpleDialog";
import OrderList from "./OrderList";
import React,{useState} from "react";
import ExecuteOrderDialogContent from "../dialogs/ExecuteOrderDialogContent";
import CancelOrderDialogContent from "../dialogs/CancelOrderDialogContent";


const OrderActions = [
  'Execute Order',
  'Show Child Orders',
  'Cancel Order'
]

export default function ParentOrderContainer({orders, navToChildOrders, addChildOrder, cancelOrder}: ParentOrderContainerProps){
  const [executeOrderDialogOpen, setExecuteOrderDialogOpen] = useState(false);
  const [cancelOrderDialogOpen, setCancelOrderDialogOpen] = useState(false);
  const [order, setOrder] = useState<Order>();

 const handleOrderAction = (order: Order, action: string) => {
    switch(action){
      case 'Execute Order':
        handleExecuteOrder(order);
        break;
      case 'Show Child Orders':
        handleShowChildOrders(order);
        break;
      case 'Cancel Order':
        handleCancelOrder(order);
        break;
    }
 }

  const handleExecuteOrder = (order: Order) => {
    setExecuteOrderDialogOpen(true);
    setOrder(order);
  }

  const handleShowChildOrders = (order: Order) => {
    console.log('Show Child Orders clicked');
    navToChildOrders(order);

  }

  const handleCancelOrder = (order: Order) => {
    setCancelOrderDialogOpen(true);
    setOrder(order);
  }

  const handleClose = () => {
    setExecuteOrderDialogOpen(false);
    setCancelOrderDialogOpen(false);
  }

  const onSubmitOrder = (childOrder: Order) => {
    if(order === undefined) {
      alert('Something went wrong! Try again.');
      return;
    }
    addChildOrder(childOrder, order.orderId);
    handleClose();
  }

  const onCancelOrder = (order: Order) => {
    cancelOrder(order);
    handleClose();
  }


    return (
      <>
      <OrderList data={orders as Array<Order>} actions={OrderActions} handleOrderAction={handleOrderAction}></OrderList>
      { order && <SimpleDialog title={"Execute Order"} open={executeOrderDialogOpen} onClose={()=> handleClose()} DialogContent={ <ExecuteOrderDialogContent order={order} onSubmitOrder={onSubmitOrder} onCancel={handleClose}></ExecuteOrderDialogContent>} ></SimpleDialog>}
      { order && <SimpleDialog title={"Cancel Order"} open={cancelOrderDialogOpen} onClose={()=> handleClose()} DialogContent={ <CancelOrderDialogContent order={order} onCancelOrder={ onCancelOrder } onCancel={handleClose}></CancelOrderDialogContent>}></SimpleDialog>}
    </>
      )
     
  }

  interface ParentOrderContainerProps {
    orders: Array<ParentOrder>,
    navToChildOrders: (order: Order)=> void;
    addChildOrder: (order: Order, parentOrderId: string)=> void;
    cancelOrder: (order: Order)=> void;
  }