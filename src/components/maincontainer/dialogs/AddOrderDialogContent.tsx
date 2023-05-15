import React, {useState} from "react";
import { Button, Switch, TextField } from "@mui/material";
import CurrencyPairData from "../../../models/internal/currencypairdata";

export default function AddOrderDialogContent({orderId, currencyPairData, onAdd, onCancel}: AddOrderDialogContentProps) {
    const [isBuy, setIsBuy] = useState(true);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);


    const handleSideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBuy(!e.target.checked);
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setPrice(Number(e.target.value));
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setQuantity(Number(e.target.value));
    }


    const handleAdd = () => {
        onAdd(orderId, currencyPairData, price, quantity, isBuy);
    }
    
    return (<div style={{width: "270px", display: 'flex', flexDirection: 'column'}}>
        <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px"}}>
            <div>Order Id</div>
            <div>{orderId}</div>
        </div>
        <div style={{display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginLeft: "25px", marginRight: "25px"}}>
            <div>{currencyPairData.name}</div>
            <div>{currencyPairData.updatePrice}</div>
        </div>
        <div style={{display:"flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <div>Buy</div><Switch color="info" onChange = { (e)=> handleSideChange(e)}></Switch><div>Sell</div>
        </div>

        <div style={{display:"flex", margin: "10px", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <TextField id="price-textfield" label="Price" variant="outlined" type="number" onChange = {(e) => handlePriceChange(e) }></TextField>
        </div>
        <div style={{display:"flex", margin: "10px", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <TextField id="quantity-textfield" label="Quantity" variant="outlined" type="number" onChange = {(e) => handleQuantityChange(e) }></TextField>
        </div>

        <div style={{display:"flex", flexDirection: "row" , justifyContent: 'space-evenly', alignItems: 'center', marginBottom: "10px"}}>
            <Button variant="contained" onClick = {()=> handleAdd() }>Add</Button>
            <Button variant="outlined" onClick={()=> onCancel()}>Cancel</Button>
        </div>

        </div>);
} 

interface AddOrderDialogContentProps {
    orderId: string;
    currencyPairData: CurrencyPairData;
    onAdd: (orderId: string, currencyPairData: CurrencyPairData, price: number, quantity: number, isBuy: boolean) => void;
    onCancel: () => void;
}