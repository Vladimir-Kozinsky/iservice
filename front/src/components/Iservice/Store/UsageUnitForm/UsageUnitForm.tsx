import { useDispatch } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./UsageUnitForm.module.scss"
import { AppDispatch } from "../../../../store/store";
import { Field, Form, Formik } from "formik";
import { IUsageUnitDto } from "../../../../store/reducers/storeReducer/storeReducerTypes";
import { useState } from "react";
import StoreInput from "../../../../common/inputs/StoreInput";
import StoreTextArea from "../../../../common/inputs/StoreTextArea";
import classNames from "classnames";
import { IUnit } from "../../../../types/types";
import { updateUnit } from "../../../../store/reducers/storeReducer/storeReducer";

type NewUnitFormPropsType = {
    isUsageUnit: (unit: null | IUnit) => void;
    unit: IUnit
}

const UsageUnitForm: React.FC<NewUnitFormPropsType> = ({ unit, isUsageUnit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [delMess, setDelMess] = useState(false);

    return (
        <Formik
            initialValues={{
                _id: unit._id,
                quantity: unit.quantity,
                aircraft: 'EX-37017',
                wo: '',
                date: '',
                remark: ''
            }}
            validate={values => {
                interface IUsageUnitErrorsDto {
                    quantity?: string;
                    aircraft?: string;
                    wo?: string;
                    date?: string;
                    remark?: string;

                }
                const errors: IUsageUnitErrorsDto = {};
                if (!values.quantity) errors.quantity = 'Quantity is required';
                if (!values.aircraft) errors.aircraft = 'Aircraft Reg. Mark is required';
                if (!values.date) errors.date = 'Date is required';
                if (!values.wo) errors.wo = 'Work Order No. is required';
                if (!values.remark) errors.remark = 'Remark is required';
                return errors;
            }}
            onSubmit={(values: IUsageUnitDto) => {
                (async () => {
                    values._id = unit._id
                    setIsLoader(true);
                    console.log(values);
                    await dispatch(updateUnit(values));
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
                            <h3 className={s.section__header}>Usage Item</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>P/N<span>*</span></label>
                                    <Field disabled type="text" id="pn" name="pn"
                                        placeholder={unit.pn} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>S/N<span>*</span></label>
                                    <Field disabled type="text" id="sn" name="sn"
                                        placeholder={unit.sn} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Quantity<span>*</span></label>
                                    <Field className={s.inputs__block__number} type="number" id="quantity" name="quantity"
                                        error={errors.quantity} as={StoreInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>EA/Pack<span>*</span></label>
                                    <span>{unit.eapack}</span>
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Aircraft Reg. Mark<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.aircraft && s.error)} type="text" id="aircraft" name="aircraft"
                                        error={errors.aircraft} as="select">
                                        <option value="">No value</option>
                                        <option value="EX-37017">EX-37017</option>
                                    </Field>
                                </div>


                                <div className={s.inputs__block}>
                                    <label>Work Order No.<span></span></label>
                                    <Field type="text" id="wo" name="wo"
                                        error={errors.wo} as={StoreInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Usage date<span></span></label>
                                    <Field type="date" id="date" name="date"
                                        error={errors.date} as={StoreInput} />
                                </div>

                            </div>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Remark<span></span></label>
                                    <Field style={{ width: '326px' }} type="text" id="remark" name="remark"
                                        placeholder="Remarks" error={errors.remark} as={StoreTextArea} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={s.store__buttons} >
                        <Button text="Back" btnType="button" color="white" handler={() => isUsageUnit(null)} />
                        <Button text="Use" color="green" btnType="submit" />
                    </div>
                </div>

            </Form>
        )}
        </Formik>

    )
}

export default UsageUnitForm;