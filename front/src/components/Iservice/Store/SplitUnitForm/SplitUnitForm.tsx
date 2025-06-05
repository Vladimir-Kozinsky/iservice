import { useDispatch } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./SplitUnitForm.module.scss"
import { AppDispatch } from "../../../../store/store";
import { Field, Form, Formik } from "formik";
import { ISplitUnitDto, IUsageUnitDto } from "../../../../store/reducers/storeReducer/storeReducerTypes";
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

const SplitUnitForm: React.FC<NewUnitFormPropsType> = ({ unit, isUsageUnit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [delMess, setDelMess] = useState(false);

    return (
        <Formik
            initialValues={{
                _id: unit._id,
                date: '',
                quantity: unit.quantity,
                splitQuantity: 0,
                splitLocation: '',
            }}
            validate={values => {
                interface ISplitUnitErrorsDto {
                    quantity?: string;
                    date?: string;
                    splitQuantity?: string,
                    splitLocation?: string,
                }
                const errors: ISplitUnitErrorsDto = {};
                if (!values.splitQuantity) errors.splitQuantity = 'Quantity is required';
                if (!values.date) errors.date = 'Date is required';
                if (!values.splitLocation) errors.splitLocation = 'Location is required';
                if ((values.quantity - values.splitQuantity) < 0) errors.splitQuantity = 'Requested qty to much';
                return errors;
            }}
            onSubmit={(values: ISplitUnitDto) => {
                (async () => {
                    values._id = unit._id
                    setIsLoader(true);
                    console.log(values);
                    //await dispatch(updateUnit(values));
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
                            <h3 className={s.section__header}>Split Item</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Split Date.<span>*</span></label>
                                    <Field className={s.inputs__block__number} type="date" id="date" name="date"
                                        error={errors.date} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>P/N<span>*</span></label>
                                    <span>{unit.pn}</span>
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Location<span></span></label>
                                    <span>{unit.location}</span>
                                </div>


                            </div>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Total Qty.<span></span></label>
                                    <span>{unit.quantity}</span>
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Remain Qty.<span></span></label>
                                    <span>{unit.quantity - values.splitQuantity}</span>
                                </div>

                                <div className={s.inputs__block}>
                                    <label>EA/Pack</label>
                                    <span>{unit.eapack}</span>
                                </div>

                            </div>


                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Split to<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.splitLocation && s.error)} type="text" id="splitLocation" name="splitLocation"
                                        placeholder="Type" error={errors.splitLocation} as="select">
                                        <option value="">No value</option>
                                        <option disabled={unit.location === "Sharjah" ? true : false} value="Sharjah">Sharjah</option>
                                        <option disabled={unit.location === "Manas" ? true : false} value="Manas">Manas</option>
                                        <option disabled={unit.location === "Aqaba" ? true : false} value="Aqaba">Aqaba</option>
                                        <option disabled={unit.location === "Ras-Al-Khaima" ? true : false} value="Ras-Al-Khaima">Ras-Al-Khaima</option>
                                        <option disabled={unit.location === "Ajman" ? true : false} value="Ajman">Ajman</option>
                                        <option disabled={unit.location === "Shop" ? true : false} value="Shop">Shop</option>
                                        <option disabled={unit.location === "EX-37017" ? true : false} value="EX-37017">EX-37017</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Split Qty.<span>*</span></label>
                                    <Field className={s.inputs__block__number} type="number" id="splitQuantity" name="splitQuantity"
                                        error={errors.splitQuantity} as={StoreInput} />
                                </div>



                                <div className={s.inputs__block}>
                                    <label>EA/Pack</label>
                                    <span>{unit.eapack}</span>
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
        )
            }
        </Formik >
    )
}

export default SplitUnitForm;