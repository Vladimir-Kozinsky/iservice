import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./NewRequestForm.module.scss"
import { AppDispatch, RootState } from "../../../../store/store";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import RequestInput from "../../../../common/inputs/RequestInput/RequestInput";
import classNames from "classnames";
import Select from "../../../../common/inputs/Select/Select";
import ItemForm from "./ItemForm/ItemForm";
import crosIcon from "../../../../assets/img/png/cross.png"
import minusIcon from "../../../../assets/img/png/minus.png"
import { createRequest } from "../../../../store/reducers/requestReducer/requestReducer";
import { ISatus } from "../../../../store/reducers/requestReducer/requestReducerTypes";

export interface ICreateRequestErrorsDto {
    requestNumber?: string;
    date?: string;
    priority?: string;
    items?: string;
    requestedBy?: string;
    status?: string;
    statusHistory?: string;
}

type NewRequestFormPropsType = {
    isNewForm: (isNewWorm: boolean) => void;
}

export type ItemType = {
    pn: string;
    desc: string;
    ref: string;
    quantity: number;
    poRef: string;
}

interface IRequestValuesType {
    requestNumber: string,
    date: string,
    priority: string,
    items: ItemType[],
    status: string;
    statusHistory: ISatus[];
}

const NewRequestForm: React.FC<NewRequestFormPropsType> = ({ isNewForm }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [fildsQuantity, setFildsQuantity] = useState({ items: [1] });

    const removeFildHandler = () => {
        if (fildsQuantity.items.length > 1) {
            const arr = fildsQuantity.items;
            arr.splice(arr.length - 1, 1)
            setFildsQuantity({ items: arr })
        }
    }

    const addFildHandler = () => {
        const arr = fildsQuantity.items;
        arr.push(fildsQuantity.items.length + 1)
        setFildsQuantity({ items: arr })
    }
    const date = new Date();

    return (
        <Formik
            initialValues={{
                requestNumber: '',
                date: '',
                priority: '',
                items: [],
                requestedBy: '',
                status: '',
                statusHistory: []
            }}
            validate={values => {

                const errors: ICreateRequestErrorsDto = {};
                if (!values.requestNumber) errors.requestNumber = 'Request No is required';
                if (!values.date) errors.date = 'Request date is required';
                return errors;
            }}
            onSubmit={(values: IRequestValuesType) => {
                (async () => {
                    setIsLoader(true);
                    values.status = 'created';
                    values.statusHistory.push({
                        date: date.toISOString().split('T')[0],
                        status: `created`,
                        user: `${user.firstName} ${user.lastName}`,
                        remark: ''
                    })
                    console.log(values)
                    const updatedItems = values.items.map((item: ItemType) => {
                        item.poRef = 'no'
                        return item;
                    })
                    values.items = updatedItems;
                    await dispatch(createRequest(values));
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
            <Form className={s.newUnitForm__container}>
                <div className={s.newUnitForm__wrapper}>
                    <div className={s.newUnitForm}>
                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Create request</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Request No. <span>*</span></label>
                                    <Field type="text" id="requestNumber" name="requestNumber"
                                        placeholder="Request No" error={errors.requestNumber} as={RequestInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Date<span></span></label>
                                    <Field type="date" id="date" name="date"
                                        placeholder="" error={errors.date} as={RequestInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Priority<span>*</span></label>
                                    <Field type="text" id="priority" name="priority"
                                        placeholder="Type" error={errors.priority} as={Select}>
                                        <option value="A">“A” AOG</option>
                                        <option value="B">“B” Critical</option>
                                        <option value="C">“C” ASAP</option>
                                        <option value="D">“D” Stock</option>
                                    </Field>
                                </div>
                            </div>
                            <div className={classNames(s.inputs, s.inputs__items)}>
                                <div className={s.inputs__item}>
                                    <div className={classNames(s.item__title, s.item__title__no)}>No.</div>
                                    <div className={classNames(s.item__title, s.item__title__pn)}>Part Number</div>
                                    <div className={classNames(s.item__title, s.item__title__desc)}>Description</div>
                                    <div className={classNames(s.item__title, s.item__title__ref)}>Reference</div>
                                    <div className={classNames(s.item__title, s.item__title__qty)}>Qty.</div>
                                </div>
                                {fildsQuantity.items.map((item: any) => <ItemForm errors={errors} no={item - 1} />)}
                                <button onClick={removeFildHandler} className={s.minus__btn} type="button" ><img src={minusIcon} alt="icon" /></button>
                                <button onClick={addFildHandler} className={s.cross__btn} type="button"  ><img src={crosIcon} alt="icon" /></button>
                            </div>
                            <div className={s.inputs}>
                                <div className={classNames(s.inputs__block, s.inputs__block__req)}>
                                    <label>Requested by<span>*</span></label>
                                    <span>{`${user.firstName} ${user.lastName}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.newUnitForm__buttons} >
                        <Button text="Back" btnType="button" color="white" handler={() => isNewForm(false)} />
                        <Button text="Create" color="green" btnType="submit" />
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    )
}

export default NewRequestForm;

