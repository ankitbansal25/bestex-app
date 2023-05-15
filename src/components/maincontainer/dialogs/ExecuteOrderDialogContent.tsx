import { Button, Switch, TextField } from "@mui/material";
import { Order, Side, OrderStatus } from "../../../models/order";
import { useState } from "react";
import { ParentOrder } from "../../../models/parentorder";

export default function ExecuteOrderDialogContent({order, onSubmitOrder, onCancel}: ExceuteOrderDialogProps) {
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setPrice(Number(e.target.value));
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setQuantity(Number(e.target.value));
    }

    const generateNewChildOrderId = () => {
        let parentId = order.orderId;
        let childOrders = (order as ParentOrder).childOrders;
        if(childOrders === undefined || childOrders.length === 0) {
            return parentId + '-1';
        } else {
            let lastChildOrder = childOrders[childOrders.length - 1];
            let lastChildOrderId = lastChildOrder.orderId;
            let lastChildOrderNumber = Number(lastChildOrderId.split('-')[1]);
            return parentId + '-' + (lastChildOrderNumber + 1);
        }
    }


    const handleSubmitOrder = () => {
        if(price === 0 || quantity === 0) {
            alert('Price and Quantity cannot be 0');
            return;
        }

        if(quantity > (order as ParentOrder).remainingQuantity) {
            alert('Quantity cannot be greater than remaining quantity');
            return;
        }

        let childOrder: Order = {
            orderId: generateNewChildOrderId(),
            symbol: order.symbol,
            side: order.side,
            orderStatus: OrderStatus.Open,
            quantity: quantity,
            price: price,
        }
        onSubmitOrder(childOrder);
    }


    return (<div style={{width: "270px", display: 'flex', flexDirection: 'column'}}>
    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px"}}>
        <div>Order Id</div>
        <div>{order.orderId}</div>
    </div>
    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px"}}>
        <div>{order.symbol}</div>
        <div>{order.price}</div>
    </div>
    <div style={{display:"flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
    <div>Buy</div><Switch color="info" disabled defaultChecked = { order.side !== Side.Buy}></Switch><div>Sell</div>
    </div>

    <div style={{display:"flex", margin: "10px", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
    <TextField id="price-textfield" label="Price" variant="outlined" type="number" onChange = {(e) => handlePriceChange(e) }></TextField>
    </div>
    <div style={{display:"flex", margin: "10px", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
    <TextField id="quantity-textfield" label="Quantity" variant="outlined" type="number" onChange = {(e) => handleQuantityChange(e) }></TextField>
    </div>

    <div style={{display:"flex", flexDirection: "row" , justifyContent: 'space-evenly', alignItems: 'center', marginBottom: "10px"}}>
        <Button variant="contained" onClick = {()=> handleSubmitOrder() }>Submit</Button>
        <Button variant="outlined" onClick={()=> onCancel()}>Cancel</Button>
    </div>

    </div>);
} 

interface ExceuteOrderDialogProps {
    order: Order;
    onSubmitOrder: (order: Order) => void;
    onCancel: () => void;
}