import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./NewPoForm.module.scss"
import { AppDispatch, RootState } from "../../../../store/store";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IRequest, ISatus } from "../../../../store/reducers/requestReducer/RequestReducerTypes";
import RequestInput from "../../../../common/inputs/RequestInput/RequestInput";
import { ItemType } from "../NewRequestForm/NewRequestForm";
import OrderItemForm, { IOrderItemType } from "./OrderItemForm/OrderItemForm";
import StoreTextArea from "../../../../common/inputs/StoreTextArea";
import { createOrder } from "../../../../store/reducers/requestReducer/RequestReducer";
import { useReactToPrint } from "react-to-print";
import Loader from "../../../../common/Loader/Loader";
import { Transition } from "react-transition-group";
import withSuccessMessage from "../../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../../HOC/wirhErrorMessage";
import { compose } from "@reduxjs/toolkit";

type NewpoFormPropsType = {
    parts: string[];
    request: IRequest;
    handler: (isForm: boolean) => void;
}

interface IPoValuesType {
    poNumber: string;
    poDate: string;
    requestNumber: string;
    items: IOrderItemType[] | ItemType[];
    poPrice: string;
    customer: string;
    billTo: string;
    supplier: string;
    shipAdress: string;
    status: string;
    statusHistory: ISatus[];
    createdBy: string;
}



const defaultAdress = "Air Charter Express LLC \nVilla- 24, Street- 39 \nAl Rumailah-2, Ajman \nUnited Arab Emirates \nEmail- director@ace-rak.pro \nPhone- +971(6)7441011"


const NewPoForm: React.FC<NewpoFormPropsType> = ({ parts, handler, request }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const componentRef = useRef(null);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);

    // const handleCreateOrder = (values:IPoValuesType) => {
    //     return dispatch(createOrder(values)
    // }

    const textareaStyles = {
        width: '200px',
        borderRadius: "0px",
        padding: "2px",
        color: "black"
    }

    const findInArr = (arr: ItemType[], pn: string) => {
        const value = arr.find((item: ItemType) => item.pn === pn)
        return value
    }
    const items: ItemType[] = [];

    const arrItems = () => {
        parts.forEach((i: string) => {
            const isItem = findInArr(request.items, i);
            if (isItem) items.push(isItem);
        })
    }
    arrItems();

    const date = new Date();

    return (
        <Formik
            initialValues={{
                poDate: date.toISOString().split('T')[0],
                poNumber: '',
                requestNumber: request.requestNumber,
                items: items,
                poPrice: '',
                customer: defaultAdress,
                billTo: defaultAdress,
                supplier: 'Dasi',
                shipAdress: '',
                status: '',
                statusHistory: [],
                createdBy: `${user.firstName} ${user.lastName}`,
            }}
            validate={values => {
                interface ICreateRequestErrorsDto {
                    poNumber?: string;
                    requestNumber?: string;
                    items?: string;
                    poPrice?: string;
                    customer?: string;
                    billTo?: string;
                    supplier?: string;
                    shipAdress?: string;
                }
                const errors: ICreateRequestErrorsDto = {};
                if (!values.poNumber) errors.poNumber = 'PO No. is required';
                if (!values.poPrice) errors.poPrice = 'Required';
                if (!values.customer) errors.customer = 'Required';
                if (!values.billTo) errors.billTo = 'Required';
                if (!values.shipAdress) errors.shipAdress = 'Required';
                if (!values.supplier) errors.supplier = 'Required';
                return errors;
            }}
            onSubmit={(values: IPoValuesType) => {
                (async () => {
                    setIsLoader(true);
                    values.status = 'created';
                    values.createdBy = `${user.firstName} ${user.lastName}`;
                    values.statusHistory.push({
                        date: date.toISOString().split('T')[0],
                        status: `created`,
                        user: `${user.firstName} ${user.lastName}`,
                        remark: ''
                    })
                    await dispatch(createOrder(values))
                    console.log('send PO')
                    setIsLoader(false);
                })()
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
        }) => (
            <Form className={s.newPoForm__container} >
                <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                    {(state) => <Loader state={state} />}
                </Transition>
                <div className={s.newPoForm__wrapper}>
                    <div ref={componentRef}>
                        <h3 className={s.section__header}>PURCHASE ORDER</h3>
                        <div className={s.newPoForm__no}>
                            <div className={s.newPoForm__no__block}>
                                <label htmlFor="">PO#</label>
                                <Field type="text"
                                    id="poNumber" name="poNumber" error={errors.poNumber} as={RequestInput} />
                            </div>

                        </div>
                        <div className={s.newPoForm__info}>
                            <Field style={textareaStyles}
                                placeholder={defaultAdress} name="customer" id="customer" error={errors.customer} as={StoreTextArea} />
                            <Field style={textareaStyles} placeholder="DASI" name="supplier" id="supplier" error={errors.supplier} as={StoreTextArea} />
                        </div>

                        <div className={s.newPoForm__info}>
                            <Field style={textareaStyles}
                                placeholder={defaultAdress} name="billTo" id="billTo" error={errors.billTo} as={StoreTextArea} />
                            <Field style={textareaStyles} placeholder="FlyTech" name="shipAdress" id="shipAdress" error={errors.shipAdress} as={StoreTextArea} />
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
                                {items.reverse().map((item: ItemType, index: number) => {
                                    return (
                                        <OrderItemForm no={index} errors={undefined} />
                                    )
                                })}
                                {!items.length && <span>No items are choosed</span>}
                                <tr>
                                    <td className={s.merged__ceil} colSpan={4}></td>
                                    <td  >Total:</td>
                                    <td>
                                        <Field style={{ width: "65px", border: "none" }}
                                            type="text" id="poPrice" name="poPrice" error={errors.poPrice} as={RequestInput} />
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
                                    <span>{`${user.firstName} ${user.lastName}`}</span>
                                </td>
                                <td>Reviewed by:</td>
                                <td>Approved by:</td>
                            </tr>
                        </table>
                    </div>

                    <div className={s.newPoForm__buttons}>
                        <Button text={'Back'} color={"white"} btnType={"button"}
                            handler={() => handler(false)} />
                        <Button text={'Create PO'} color={"green"} btnType="button" handler={handleSubmit} />
                        {/* <Button text={'Create PO'} color={"green"} handler={handleCreateOrder} btnType="button" /> */}
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    )
}



export default NewPoForm

