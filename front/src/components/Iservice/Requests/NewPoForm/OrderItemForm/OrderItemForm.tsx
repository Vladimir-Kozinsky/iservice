
import { useDispatch, useSelector } from "react-redux";
import s from "./OrderItemForm.module.scss"
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../../store/store";
import RequestInput from "../../../../../common/inputs/RequestInput/RequestInput";
import Select from "../../../../../common/inputs/Select/Select";

type NewItemPropsType = {
    no: number;
    errors: any;
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

const OrderItemForm: React.FC<NewItemPropsType> = ({ no, errors }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    return (
        <tr className={s.inputs__item}>
            <td> <Field style={{ border: "none" }} type="text" id={`items[${no}.pn]`} name={`items[${no}.pn]`}
                as={RequestInput} /></td>
            <td><Field style={{ width: "200px", border: "none" }} type="text" id={`items[${no}.desc]`} name={`items[${no}.desc]`}
                as={RequestInput} /></td>
            <td> <Field style={{ width: "36px", border: "none" }} type="number" id={`items[${no}.quantity]`} name={`items[${no}.quantity]`}
                as={RequestInput} /></td>
            <td> <Field style={{ width: "50px", border: "none" }} type="text" id={`items[${no}.uom]`} name={`items[${no}.uom]`}
                as={"select"}>
                <option value="N/A">N/A</option>
                <option value="EA">EA</option>
                <option value="RL">RL</option>
                <option value="GL">GL</option>
                <option value="CAN">CAN</option>
            </Field></td>
            <td> <Field style={{ width: "60px", border: "none" }} type="text" id={`items[${no}.price]`} name={`items[${no}.price]`}
                as={RequestInput} /></td>
            <td> <Field style={{ width: "60px", border: "none" }} type="text" id={`items[${no}.totalprice]`} name={`items[${no}.totalprice]`}
                as={RequestInput} /></td>
        </tr>
    )
}

export default OrderItemForm;

