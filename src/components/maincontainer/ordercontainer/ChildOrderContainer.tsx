import { Order } from "../../../models/order";
import OrderList from "./OrderList";

export default function ChildOrderContainer({orders}: ChildOrderContainerProps){
    return (
      <OrderList data={orders} actions={[]} handleOrderAction={() => {}}></OrderList>
    )
  }


interface ChildOrderContainerProps {
     orders: Array<Order>;
}  