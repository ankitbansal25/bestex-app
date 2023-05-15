import React, { useState, useEffect } from 'react'
import { CurrencyPair } from '../../models/currencypair'
import SimpleDialog from '../common/SimpleDialog'
import AddOrderDialogContent from './dialogs/AddOrderDialogContent'
import { getLastDayCurrencyPairClosePrices } from '../../apis/watchlistapi'
import { CircularProgress } from '@mui/material'
import { CurrnecyPairTickSizes } from '../../utils/constants'
import getMaxXFactor from '../../utils/getMaxXFactor'
import CurrencyPairData from '../../models/internal/currencypairdata'
import { Order } from '../../models/order'
import { OrderStatus, Side } from '../../models/order'
import { generateNewOrderId } from '../../utils/generateNextOrderId'
import './WatchList.css'

/**
 * Update the currency pair data
 *
 * UpdatePrice: Close price + (+/-x * tick size)
 * percentChange: ((updatedPrice - closePrice) / closePrice) * 100
 * actualChange: updatedPrice - closePrice
 *
 * @param currencyPair CurrenctPairData
 *
 */
function updateCurrencyData(currencyPair: CurrencyPairData) {
    let randomX = Math.floor(Math.random() * currencyPair.maxFactorX)
    let randomSign = Math.random() > 0.5 ? 1 : -1
    let randomChange = randomX * currencyPair.tickSize * randomSign

    let updatedPrice = Number(
        (currencyPair.closePrice + randomChange).toPrecision(5)
    )
    let percentChange = Number(
        (
            ((updatedPrice - currencyPair.closePrice) /
                currencyPair.closePrice) *
            100
        ).toPrecision(3)
    )
    let actualChange = Number(
        (updatedPrice - currencyPair.closePrice).toPrecision(3)
    )

    currencyPair.updatePrice = updatedPrice
    currencyPair.percentChange = percentChange
    currencyPair.actualChange = actualChange
}

/**
 * WatchList component
 *
 */
export default function WatchList({ onAddOrder }: WatchListProps) {
    const [uistate, setUiState] = useState('loading') // ['loading', 'success', 'error']
    const [currencyPairData, setCurrencyPairData] = useState<
        Array<CurrencyPairData>
    >([])
    const [hoveredCurrencyPairId, setHoveredCurrencyPairId] = useState('')
    const [selectedCurrencyPairData, setSelectedCurrencyPairData] = useState<
        CurrencyPairData | undefined
    >()
    const [open, setOpen] = React.useState(false)

    // dummy state maintained to trigger updatePrice every second
    const [toggle, setToggle] = useState(false)

    const [nextOrderId, setNextOrderId] = useState('BX00003')

    const onSuccess = (data: Array<CurrencyPair>) => {
        setUiState('success')
        let newCurrencyPairData = data.map((currencyPair) => {
            return {
                id: currencyPair.id,
                name: currencyPair.name,
                closePrice: Number(currencyPair.value),
                updatePrice: Number(currencyPair.value),
                percentChange: 0,
                actualChange: 0,
                tickSize:
                    CurrnecyPairTickSizes[
                        currencyPair.id as keyof typeof CurrnecyPairTickSizes
                    ],
                maxFactorX: getMaxXFactor(currencyPair),
            }
        })
        setCurrencyPairData(() => [...newCurrencyPairData])
    }

    useEffect(() => {
        setUiState('loading')
        // fetch the last day close prices
        getLastDayCurrencyPairClosePrices(onSuccess)
    }, [])

    useEffect(() => {
        // update the price every second
        const intervalId = setInterval(() => {
            setToggle((toggle) => !toggle)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    const updatePrice = () => {
        if (currencyPairData.length === 0) return
        let updatedCurrencyPairData = [...currencyPairData]
        updatedCurrencyPairData.forEach((currencyPair) => {
            updateCurrencyData(currencyPair)
        })
        setCurrencyPairData(updatedCurrencyPairData)
    }

    useEffect(() => {
        updatePrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle])

    const handleClose = () => {
        setOpen(false)
    }

    const handleAddOrderClick = () => {
        setOpen(true)
    }

    const handleMouseEnter = (currencyPairData: CurrencyPairData) => {
        setHoveredCurrencyPairId(currencyPairData.id)
        setSelectedCurrencyPairData(currencyPairData)
    }

    const handleMouseLeave = () => {
        setHoveredCurrencyPairId('')
    }

    /**
     * Add Order Dialog - Handle Add Button
     */
    const handleAddOrder = (
        orderId: string,
        currencyPairData: CurrencyPairData,
        price: number,
        quantity: number,
        isBuy: boolean
    ) => {
        if (price === 0 || quantity === 0) {
            alert('Price or Quantity cannot be 0')
            return
        }

        let order: Order = {
            orderId: orderId,
            symbol: currencyPairData.id,
            price: price,
            quantity: quantity,
            side: isBuy ? Side.Buy : Side.Sell,
            orderStatus: OrderStatus.Open,
        }
        onAddOrder(order)
        setNextOrderId(generateNewOrderId(orderId))
        handleClose()
    }

    /**
     * Add Order Dialog - Handle Cancel Button
     */
    const handleCancelOrder = () => {
        handleClose()
    }

    return (
        <div className="Container">
            <h3>WatchList</h3>
            {uistate === 'loading' && (
                <div className="CircularLoader">
                    <CircularProgress />
                </div>
            )}
            {uistate === 'success' && (
                <div className="CurrencyDataContainer">
                    {currencyPairData.map((data) => {
                        return (
                            <div
                                key={data.id}
                                className="CurrencyData"
                                onMouseEnter={() => handleMouseEnter(data)}
                                onMouseLeave={() => handleMouseLeave()}
                            >
                                <div>{data.name}</div>
                                <div className="PriceContainer">
                                    <div>{data.updatePrice}</div>
                                    {data.actualChange !== 0 && (
                                        <div style={{ fontSize: '10px' }}>
                                            {data.actualChange} (
                                            {data.percentChange}%)
                                        </div>
                                    )}
                                </div>
                                {hoveredCurrencyPairId === data.id && (
                                    <button
                                        onClick={() => handleAddOrderClick()}
                                    >
                                        Add Order
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    {selectedCurrencyPairData && (
                        <SimpleDialog
                            title={'Add Order'}
                            open={open}
                            onClose={() => handleClose()}
                            dialogContent={
                                <AddOrderDialogContent
                                    orderId={nextOrderId}
                                    currencyPairData={selectedCurrencyPairData}
                                    onAdd={handleAddOrder}
                                    onCancel={handleCancelOrder}
                                ></AddOrderDialogContent>
                            }
                        ></SimpleDialog>
                    )}
                </div>
            )}
        </div>
    )
}

/**
 * WatchListProps
 */
interface WatchListProps {
    onAddOrder: (order: Order) => void
}
