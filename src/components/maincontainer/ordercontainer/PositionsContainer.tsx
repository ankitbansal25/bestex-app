import { Table } from "react-bootstrap";
import { QuantityPrice } from "./OrderContainer";

export default function PositionsContainer({dataMap}: PositionsContainerProps){
    const keys = Array.from(dataMap.keys());
    const values = Array.from(dataMap.values());
    return (
      <Table style={{width: '-webkit-fill-available'}} striped bordered hover size="sm">
        <thead>
      <tr>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Symbol</th>
        <th style={{background: 'lightgrey', border: '1px solid black'}}>Net Quantity</th>
        <th style={{background: 'lightgrey',border: '1px solid black'}}>Average Price</th>
      </tr>
    </thead>
    {keys.map((key, index) => {
      return (
        <tbody key={key} style={{textAlign: 'center'}}>
          <tr>
            <td style={{border: '1px solid black'}}>{key}</td>
            <td style={{border: '1px solid black'}}>{values[index].totalTradedQuantity}</td>
            <td style={{border: '1px solid black'}}>{ 
              values[index].totalPrice / values[index].totalCount
            }</td>
          </tr>
        </tbody>
      )
    })}
        </Table>
    )
  }

  interface PositionsContainerProps {
    dataMap: Map<string, QuantityPrice>
  }