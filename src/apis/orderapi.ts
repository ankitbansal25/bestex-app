import { MockOrderData } from "../mock/data";
import { ParentOrder } from "../models/parentorder";

export async function getOrders(onSuccess: ((data: Array<ParentOrder>)=> void), onError?: ((error: any) => void)) {
    fetchOrders().then((data) => { onSuccess(data); }).catch((error) => { onError && onError(error)})
}


function fetchOrders(): Promise<Array<ParentOrder>> {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(MockOrderData);
        }, 1000);
    });
}