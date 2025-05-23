import { useDispatch, useSelector } from "react-redux";
import s from "./ItemForm.module.scss"
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../../store/store";
import RequestInput from "../../../../../common/inputs/RequestInput/RequestInput";
import { ICreateRequestErrorsDto } from "../NewRequestForm";

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

interface IItemValuesType {
    no: number;
    pn: string;
    desc: string;
    ref: string;
    quantity: number;
}

const ItemForm: React.FC<NewItemPropsType> = ({ no, errors }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    return (
        <div className={s.inputs__item}>
            <span>{no+1}</span>
            <Field type="text" id={`items[${no}.pn]`} name={`items[${no}.pn]`}
                as={RequestInput} />
            <Field style={{ width: "200px" }} type="text" id={`items[${no}.desc]`} name={`items[${no}.desc]`}
                as={RequestInput} />
            <Field type="text" id={`items[${no}.ref]`} name={`items[${no}.ref]`}
                as={RequestInput} />
            <Field style={{ width: "32px" }} type="number" id={`items[${no}.quantity]`} name={`items[${no}.quantity]`}
                as={RequestInput} />
        </div>
    )
}

export default ItemForm;

