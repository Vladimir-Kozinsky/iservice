
import { useDispatch, useSelector } from "react-redux";
import s from "./OrderPrintItem.module.scss"
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../../store/store";
import RequestInput from "../../../../../common/inputs/RequestInput/RequestInput";

type NewItemPropsType = {
    no: number;
    item: IOrderItemType;
}

export type ItemType = {
    no: number;
    pn: string;
    desc: string;
    ref: string;
    quantity: number;
}


export interface IOrderItemType {
    pn: string;
    desc: string;
    ref: string;
    quantity: number;
    uom: string;
    price: string;
    totalprice: string;
}

const OrderPrintItem: React.FC<NewItemPropsType> = ({ no, item }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    return (
        <tr className={s.inputs__item}>
            <td>
                <span>{item.pn}</span>
            </td>
            <td>
                <span>{item.desc}</span>
            </td>
            <td>
                <span>{item.quantity}</span>
            </td>
            <td>
                <span>{item.uom}</span>
            </td>
            <td>
                <span>{item.price}</span>
            </td>
            <td>
                <span>{item.totalprice}</span>
            </td>

        </tr>
    )
}

export default OrderPrintItem;

