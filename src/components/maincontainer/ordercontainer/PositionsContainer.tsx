import { Table } from 'react-bootstrap'
import { QuantityPrice } from './OrderContainer'
import './PositionsContainer.css'

/**
 * PositionsContainer Component
 */
export default function PositionsContainer({
    dataMap,
}: PositionsContainerProps) {
    const keys = Array.from(dataMap.keys())
    const values = Array.from(dataMap.values())
    return (
        <Table
            style={{ width: '-webkit-fill-available' }}
            striped
            bordered
            hover
            size="sm"
        >
            <thead>
                <tr>
                    <th className="PosiitonsTableHeading">Symbol</th>
                    <th className="PosiitonsTableHeading">Net Quantity</th>
                    <th className="PosiitonsTableHeading">Average Price</th>
                </tr>
            </thead>
            {keys.map((key, index) => {
                return (
                    <tbody key={key} className="PosiitonsTableBody">
                        <tr>
                            <td className="PositionsTableData">{key}</td>
                            <td className="PositionsTableData">
                                {values[index].totalTradedQuantity}
                            </td>
                            <td className="PositionsTableData">
                                {values[index].totalPrice /
                                    values[index].totalCount}
                            </td>
                        </tr>
                    </tbody>
                )
            })}
        </Table>
    )
}

/**
 * PositionsContainer Component Props
 */
interface PositionsContainerProps {
    dataMap: Map<string, QuantityPrice>
}
