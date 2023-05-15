import { Table } from "react-bootstrap";
import { Order } from "../../../models/order";
import OrderActionMenu from "./OrderActionMenu";
import { ParentOrder } from "../../../models/parentorder";

export default function OrderList({data, actions, handleOrderAction}: OrderListProps){
  return (
    <Table style={{width: '-webkit-fill-available'}} striped bordered hover size="sm">
    <thead>
      <tr>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Order Id</th>
        <th style={{background: 'lightgrey', border: '1px solid black'}}>Symbol</th>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Price</th>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Quantity</th>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Side</th>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Order Status</th>
        { actions && actions.length > 0 && <th style={{background: 'lightgrey',border: '1px solid black'}}>Action</th> }
      </tr>
    </thead>
    {data.map((item, index) => {
      return (
        <tbody key={index} style={{textAlign: 'center'}}>
          <tr>
            <td style={{border: '1px solid black'}}>{item.orderId}</td>
            <td style={{border: '1px solid black'}}>{item.symbol}</td>
            <td style={{border: '1px solid black'}}>{item.price}</td>
            { (item as ParentOrder).remainingQuantity && <td style={{border: '1px solid black'}}>{item.quantity-(item as ParentOrder).remainingQuantity}/{item.quantity}</td> } 
            { !(item as ParentOrder).remainingQuantity && <td style={{border: '1px solid black'}}>{item.quantity}</td> } 
            <td style={{border: '1px solid black'}}>{item.side}</td>
            <td style={{border: '1px solid black'}}>{item.orderStatus}</td>
            { actions && actions.length> 0 && <td style={{border: '1px solid black'}}>
              <OrderActionMenu data={item} actions={actions} handleMenuItemClick={handleOrderAction}></OrderActionMenu>
              </td> }
          </tr>
        </tbody>
      )
    })}
  </Table>



  )
} 

interface OrderListProps {
    data: Array<Order>
    actions: Array<string>
    handleOrderAction: (order: Order, action: string) => void
}