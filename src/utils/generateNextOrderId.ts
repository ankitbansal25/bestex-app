/**
 * Generate Parent New Order Id
 * @param oldOrderId Previous Order Id
 * @returns Next Order Id
 */
export const generateNewOrderId = (oldOrderId: string) => {
    let nextOrderIdNumber = Number(oldOrderId.substring(2))
    nextOrderIdNumber++
    return `BX${nextOrderIdNumber.toString().padStart(5, '0')}`
}
