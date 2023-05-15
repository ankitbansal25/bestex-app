import React, { useState } from 'react'
import { Button, Switch, TextField } from '@mui/material'
import CurrencyPairData from '../../../models/internal/currencypairdata'
import './AddOrderDialogContent.css'

/**
 * AddOrderDialogContent Component
 */
export default function AddOrderDialogContent({
    orderId,
    currencyPairData,
    onAdd,
    onCancel,
}: AddOrderDialogContentProps) {
    const [isBuy, setIsBuy] = useState(true)
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const handleSideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBuy(!e.target.checked)
    }

    const handlePriceChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPrice(Number(e.target.value))
    }

    const handleQuantityChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setQuantity(Number(e.target.value))
    }

    const handleAdd = () => {
        onAdd(orderId, currencyPairData, price, quantity, isBuy)
    }

    return (
        <div className="AddDialogContentContainer">
            <div className="AddDialogOrderId">
                <div>Order Id</div>
                <div>{orderId}</div>
            </div>
            <div className="AddOrderCurrencyPairData">
                <div>{currencyPairData.name}</div>
                <div>{currencyPairData.updatePrice}</div>
            </div>
            <div className="AddDialogSideContainer">
                <div>Buy</div>
                <Switch
                    color="info"
                    onChange={(e) => handleSideChange(e)}
                ></Switch>
                <div>Sell</div>
            </div>

            <div className="AddDialogInputContainer">
                <TextField
                    id="price-textfield"
                    label="Price"
                    variant="outlined"
                    type="number"
                    onChange={(e) => handlePriceChange(e)}
                ></TextField>
            </div>
            <div className="AddDialogInputContainer">
                <TextField
                    id="quantity-textfield"
                    label="Quantity"
                    variant="outlined"
                    type="number"
                    onChange={(e) => handleQuantityChange(e)}
                ></TextField>
            </div>

            <div className="AddDialogButtonContainer">
                <Button variant="contained" onClick={() => handleAdd()}>
                    Add
                </Button>
                <Button variant="outlined" onClick={() => onCancel()}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

/**
 * Add Order Dialog Content Props
 */
interface AddOrderDialogContentProps {
    orderId: string
    currencyPairData: CurrencyPairData
    onAdd: (
        orderId: string,
        currencyPairData: CurrencyPairData,
        price: number,
        quantity: number,
        isBuy: boolean
    ) => void
    onCancel: () => void
}
