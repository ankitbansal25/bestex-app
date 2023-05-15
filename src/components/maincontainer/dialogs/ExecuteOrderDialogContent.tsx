import { useState } from 'react'
import { Button, Switch, TextField } from '@mui/material'
import { Order, Side, OrderStatus } from '../../../models/order'
import { ParentOrder } from '../../../models/parentorder'
import generateNewChildOrderId  from '../../../utils/generateChildOrderId'
import './ExecuteOrderDialogContent.css'

/**
 * ExecuteOrderDialogContent Component
 */
export default function ExecuteOrderDialogContent({
    order,
    onSubmitOrder,
    onCancel,
}: ExceuteOrderDialogProps) {
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

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

    const handleSubmitOrder = () => {
        if (price === 0 || quantity === 0) {
            alert('Price and Quantity cannot be 0')
            return
        }

        if (quantity > (order as ParentOrder).remainingQuantity) {
            alert('Quantity cannot be greater than remaining quantity')
            return
        }

        let childOrder: Order = {
            orderId: generateNewChildOrderId(order as ParentOrder),
            symbol: order.symbol,
            side: order.side,
            orderStatus: OrderStatus.Open,
            quantity: quantity,
            price: price,
        }
        onSubmitOrder(childOrder)
    }

    return (
        <div className="ExecuteOrderDialogContainer">
            <div className="ExecuteOrderDialogContent">
                <div>Order Id</div>
                <div>{order.orderId}</div>
            </div>
            <div className="ExecuteOrderDialogContent">
                <div>{order.symbol}</div>
                <div>{order.price}</div>
            </div>
            <div className="ExecuteOrderDialogSideContainer">
                <div>Buy</div>
                <Switch
                    color="info"
                    disabled
                    defaultChecked={order.side !== Side.Buy}
                ></Switch>
                <div>Sell</div>
            </div>

            <div className="ExecuteOrderDialogInputContainer">
                <TextField
                    id="price-textfield"
                    label="Price"
                    variant="outlined"
                    type="number"
                    onChange={(e) => handlePriceChange(e)}
                ></TextField>
            </div>
            <div className="ExecuteOrderDialogInputContainer">
                <TextField
                    id="quantity-textfield"
                    label="Quantity"
                    variant="outlined"
                    type="number"
                    onChange={(e) => handleQuantityChange(e)}
                ></TextField>
            </div>

            <div className="ExecuteOrderDialogButtonContainer">
                <Button variant="contained" onClick={() => handleSubmitOrder()}>
                    Submit
                </Button>
                <Button variant="outlined" onClick={() => onCancel()}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

/**
 * ExecuteOrderDialogContent Props
 */
interface ExceuteOrderDialogProps {
    order: Order
    onSubmitOrder: (order: Order) => void
    onCancel: () => void
}
