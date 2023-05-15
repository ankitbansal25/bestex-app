import { Button } from "@mui/material";
import { Order } from "../../../models/order";

export default function CancelOrderDialogContent({order, onCancelOrder, onCancel}: CancelOrderDialogContentProps) {
    
    const handleCancelOrder = (order: Order) => {
        onCancelOrder(order);
    }
    
    return (<div style={{width: "270px", display: 'flex', flexDirection: 'column'}}>
    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px",  paddingBottom:"3px"}}>
        <div>Order ID</div>
        <div>{order.orderId}</div>
    </div>
    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px", paddingTop: "3px", paddingBottom:"3px"}}>
        <div>Symbol</div>
        <div>{order.symbol}</div>
    </div>

    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px", paddingTop: "3px", paddingBottom:"3px"}}>
        <div>Price</div>
        <div>{order.price}</div>
    </div>

    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px", paddingTop: "3px", paddingBottom:"3px"}}>
        <div>Side</div>
        <div>{order.side}</div>
    </div>

    <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px", paddingTop: "3px", paddingBottom:"3px"}}>
        <div>Quantity</div>
        <div>{order.quantity}</div>
    </div>
    
    <div style={{display:"flex", flexDirection: "row" , justifyContent: 'space-evenly', alignItems: 'center', marginTop: "20px",marginBottom: "10px"}}>
        <Button variant="contained" onClick = {()=> handleCancelOrder(order)}>Yes</Button>
        <Button variant="outlined" onClick={()=> onCancel()}>No</Button>
    </div>

    </div>);
} 


interface CancelOrderDialogContentProps {
    order: Order;
    onCancelOrder: (order: Order)=> void;
    onCancel: () => void;
}