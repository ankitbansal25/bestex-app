import React, {useState, useEffect} from 'react';
import { CurrencyPair } from '../../models/currencypair';
import SimpleDialog from '../SimpleDialog';
import AddOrderDialogContent from './dialogs/AddOrderDialogContent';
import {getLastDayCurrencyPairClosePrices} from '../../apis/watchlistapi';
import { CircularProgress } from '@mui/material';
import { CurrnecyPairTickSizes } from '../../formulaes/constants';
import getMaxXFactor from '../../formulaes/getMaxXFactor';
import CurrencyPairData from '../../models/internal/currencypairdata';
import { Order } from '../../models/order';
import { OrderStatus, Side } from '../../models/order';


function updateCurrencyData(currencyPair: CurrencyPairData){
  let randomX = Math.floor(Math.random() * currencyPair.maxFactorX);
  let randomSign = Math.random() > 0.5 ? 1 : -1;
  let randomChange = randomX * currencyPair.tickSize * randomSign;
 
  let updatedPrice = Number((currencyPair.closePrice + randomChange).toPrecision(5));
  let percentChange = Number((((updatedPrice - currencyPair.closePrice) / currencyPair.closePrice) * 100).toPrecision(3));
  let actualChange = Number((updatedPrice - currencyPair.closePrice).toPrecision(3));

  currencyPair.updatePrice = updatedPrice;
  currencyPair.percentChange = percentChange;
  currencyPair.actualChange = actualChange;
}

const generateNewOrderId = (oldOrderId: string) => {
  let nextOrderIdNumber = Number(oldOrderId.substring(2));
  nextOrderIdNumber++;
  return (`BX${nextOrderIdNumber.toString().padStart(5, '0')}`);
};


export default function WatchList({onAddOrder}: WatchListProps) {
  const [uistate, setUiState] = useState('loading'); // ['loading', 'success', 'error']
  const [currencyPairData, setCurrencyPairData] = useState<Array<CurrencyPairData>>([]);
  const [hoveredCurrencyPairId, setHoveredCurrencyPairId] = useState('');
  const [selectedCurrencyPairData, setSelectedCurrencyPairData] = useState<CurrencyPairData|undefined>();
  const [open, setOpen] = React.useState(false);

  // dummy state to trigger updatePrice
  const [toggle, setToggle] = useState(false);

  const [nextOrderId, setNextOrderId] = useState('BX00003');

  const onSuccess = (data: Array<CurrencyPair>) => {
    setUiState('success');
    let newCurrencyPairData = data.map((currencyPair) => {
        return  {
          id: currencyPair.id,
          name: currencyPair.name,
          closePrice: Number(currencyPair.value),
          updatePrice: Number(currencyPair.value),
          percentChange: 0,
          actualChange: 0,
          tickSize: CurrnecyPairTickSizes[currencyPair.id as keyof typeof CurrnecyPairTickSizes],
          maxFactorX: getMaxXFactor(currencyPair)
        }
    });
    setCurrencyPairData(() => [...newCurrencyPairData]);
  }

const updatePrice = () => {
  if(currencyPairData.length === 0) return;
  let updatedCurrencyPairData = [...currencyPairData];
  updatedCurrencyPairData.forEach((currencyPair) => {
    updateCurrencyData(currencyPair);
  });
  setCurrencyPairData(updatedCurrencyPairData);
};

  const onError = (error: any) => {
    // TODO: Not handled the UI yet
       setUiState('error');
  }

  useEffect(() => {
    setUiState('loading');
    getLastDayCurrencyPairClosePrices(onSuccess, onError);
  }, []);

  useEffect(() => {
    updatePrice();
  }, [toggle])

  useEffect(() => {
    const intervalId = setInterval(() => {
       setToggle((toggle) => !toggle);
    }, 1000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

   
  const handleMouseEnter = (currencyPairData: CurrencyPairData) => {
    setHoveredCurrencyPairId(currencyPairData.id);
    setSelectedCurrencyPairData(currencyPairData);
  }

  const handleMouseLeave = (currencyPairData: CurrencyPairData) => {
    setHoveredCurrencyPairId('');
  }

  const handleOrderClick = (currencyPairData: CurrencyPairData) => {
    handleClickOpen();
  }

  const handleAddOrder = (orderId: string, currencyPairData: CurrencyPairData, price: number, quantity: number, isBuy: boolean) => {
     // TODO: we can handle it later with error or disabled button state
    if(price === 0 || quantity === 0) return;

    let order: Order = {
      orderId: orderId,
      symbol: currencyPairData.id,
      price: price,
      quantity: quantity,
      side: isBuy ? Side.Buy : Side.Sell,
      orderStatus: OrderStatus.Open,
    }
    onAddOrder(order);
    setNextOrderId(generateNewOrderId(orderId));
    handleClose();
  }

  const handleCancelOrder = () => {
    handleClose();
  }

    return (
      <div style={{ display: 'flex', flex:1, flexDirection: 'column', alignItems: 'center', border: '1px solid black' }}>
         <h3>WatchList</h3>
         {
            uistate === 'loading' && <div style={{display:'flex', justifyContent: 'center', alignItems:'center'}}> <CircularProgress /></div>
         }
         { uistate==='success' && <div style={{display: 'flex', flexDirection: 'column', width: '-webkit-fill-available'}}>
            {currencyPairData.map((data) => {
              return (
              <div 
                key={data.id} 
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
              border: '1px solid black', padding: '10px'
              }} 
                onMouseEnter={()=> handleMouseEnter(data)} 
                onMouseLeave={ ()=> handleMouseLeave(data)}> 
                <div>{data.name}</div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div >{data.updatePrice}</div>
                { data.actualChange !== 0 && <div style={{ fontSize: '10px'}}>{data.actualChange} ({data.percentChange}%)</div> }
                </div>
                {hoveredCurrencyPairId === data.id && <button onClick={()=> handleOrderClick(data)}>Add Order</button>}
              </div>);
            })}
           { selectedCurrencyPairData && <SimpleDialog title={"Add Order"} open={open} onClose={()=> handleClose()} DialogContent={ <AddOrderDialogContent orderId={nextOrderId} currencyPairData={selectedCurrencyPairData} onAdd={handleAddOrder} onCancel={handleCancelOrder}></AddOrderDialogContent>} ></SimpleDialog> }
         </div>  
}  
      </div>
    )
  }


 interface WatchListProps {
    onAddOrder: (order: Order) => void;
 } 
