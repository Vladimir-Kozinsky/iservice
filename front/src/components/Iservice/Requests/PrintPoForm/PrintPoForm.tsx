import { useDispatch, useSelector } from "react-redux";
import s from "./PrintPoForm.module.scss"
import { AppDispatch, RootState } from "../../../../store/store";
import { useEffect, useRef, useState } from "react";
import { IOrder, ISatus } from "../../../../store/reducers/requestReducer/requestReducerTypes";
import RequestInput from "../../../../common/inputs/RequestInput/RequestInput";
import { ItemType } from "../NewRequestForm/NewRequestForm";
import OrderItemForm, { IOrderItemType } from "../NewPoForm/OrderItemForm/OrderItemForm";
import OrderPrintItem from "./OrderPrintItem/OrderPrintItem";
import { useReactToPrint } from "react-to-print";

type PrintPoFormPropsType = {
    order: IOrder;
    handler: (isForm: boolean) => void;
}

const PrintPoForm: React.FC<PrintPoFormPropsType> = ({ order, handler }) => {
    const componentRef = useRef(null);


    const handlePrint = useReactToPrint({
        content: () => {
            // isPrintForm(false)
            return componentRef.current
        }
    });


      useEffect(() => {
        handlePrint()
        handler(false);
    }, [])

    return (
        <div className={s.newPoForm__wrapper}>
            <div ref={componentRef}>
                <h3 className={s.section__header}>PURCHASE ORDER</h3>
                <div className={s.newPoForm__no}>
                    <div className={s.newPoForm__no__block}>
                        <label htmlFor="">PO#</label>
                        <span>{order.poNumber}</span>
                    </div>

                </div>
                <div className={s.newPoForm__info}>
                    <p>{order.customer}</p>
                    <p>{order.supplier}</p>
                </div>

                <div className={s.newPoForm__info}>
                    <p>{order.billTo}</p>
                    <p>{order.shipAdress}</p>
                </div>
                <div className={s.items}>
                    <span>Reference No.:  </span>
                    <table>
                        <tr>
                            <td>Part Number</td>
                            <td>Description</td>
                            <td>Qty.</td>
                            <td>UOM</td>
                            <td>Unit Price</td>
                            <td>Total Price</td>
                        </tr>
                        {order.items.map((item: IOrderItemType, index: number) => {
                            return (
                                <OrderPrintItem item={item} no={index} />
                            )
                        })}
                        {!order.items && <span>No items are choosed</span>}
                        <tr>
                            <td className={s.merged__ceil} colSpan={4}></td>
                            <td  >Total:</td>
                            <td>
                                <span>{order.poPrice}</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <span>Remarks:</span>
                </div>
                <table className={s.newPoForm__approval}>
                    <tr>
                        <td>
                            <span>Prepared by:</span>
                            <br />
                            <span>Viscas</span></td>
                        <td>
                            <span> Reviewed by: </span>
                            <br />
                            <span>{order.acceptedBy} </span>
                        </td>
                        <td>
                            <span>Approved by:</span>
                            <br />
                            <span>{order.approvedBy}</span>
                        </td>
                    </tr>
                </table>
            </div>
     </div>
    )
}

export default PrintPoForm;

