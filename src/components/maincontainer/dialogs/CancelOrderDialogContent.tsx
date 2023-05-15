import { Button } from '@mui/material'
import { Order } from '../../../models/order'
import './CancelOrderDialogContent.css'

/**
 * CancelOrderDialogContent Component
 */
export default function CancelOrderDialogContent({
    order,
    onCancelOrder,
    onCancel,
}: CancelOrderDialogContentProps) {
    const handleCancelOrder = (order: Order) => {
        onCancelOrder(order)
    }

    return (
        <div className="CancelOrderDialogContainer">
            <div className="CancelOrderDialogContent">
                <div>Order ID</div>
                <div>{order.orderId}</div>
            </div>
            <div className="CancelOrderDialogContent2">
                <div>Symbol</div>
                <div>{order.symbol}</div>
            </div>

            <div className="CancelOrderDialogContent2">
                <div>Price</div>
                <div>{order.price}</div>
            </div>

            <div className="CancelOrderDialogContent2">
                <div>Side</div>
                <div>{order.side}</div>
            </div>

            <div className="CancelOrderDialogContent2">
                <div>Quantity</div>
                <div>{order.quantity}</div>
            </div>

            <div className="CancelOrderDialogButtonContainer">
                <Button
                    variant="contained"
                    onClick={() => handleCancelOrder(order)}
                >
                    Yes
                </Button>
                <Button variant="outlined" onClick={() => onCancel()}>
                    No
                </Button>
            </div>
        </div>
    )
}

/**
 * CancelOrderDialogContent Props
 */
interface CancelOrderDialogContentProps {
    order: Order
    onCancelOrder: (order: Order) => void
    onCancel: () => void
}
