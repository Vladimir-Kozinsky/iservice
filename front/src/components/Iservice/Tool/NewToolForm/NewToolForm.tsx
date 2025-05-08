import { useDispatch } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./NewToolForm.module.scss"
import { AppDispatch } from "../../../../store/store";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import StoreInput from "../../../../common/inputs/StoreInput";
import StoreTextArea from "../../../../common/inputs/StoreTextArea";
import classNames from "classnames";
import { ICreateToolDto } from "../../../../store/reducers/toolReducer/toolReducerTypes";
import { createTool } from "../../../../store/reducers/toolReducer/toolReducer";

type NewToolFormPropsType = {
    isNewForm: (isNewWorm: boolean) => void;
}

const NewToolForm: React.FC<NewToolFormPropsType> = ({ isNewForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    return (
        <Formik
            initialValues={{
                pn: '',
                sn: '',
                type: '',
                desc: '',
                quantity: 0,
                location: '',
                rack: '',
                shelf: '',
                calibration: '',
                remarks: ''
            }}
            validate={values => {
                interface ICreateToolErrorsDto {
                    pn?: string;
                    sn?: string;
                    type?: string;
                    desc?: string;
                    quantity?: string;
                    location?: string;
                }
                const errors: ICreateToolErrorsDto = {};
                if (!values.pn) errors.pn = 'P/N is required';
                if (!values.type) errors.type = 'Type is required';
                if (!values.desc) errors.desc = 'Description is required';
                if (!values.quantity) errors.quantity = 'Quantity is required';
                if (!values.location) errors.location = 'Location is required';
                return errors;
            }}
            onSubmit={(values: ICreateToolDto) => {
                (async () => {
                    setIsLoader(true);
                    await dispatch(createTool(values));
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
                            <h3 className={s.section__header}>Add Tool/Equipment</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>P/N<span>*</span></label>
                                    <Field type="text" id="pn" name="pn"
                                        placeholder="P/N" error={errors.pn} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>S/N<span>*</span></label>
                                    <Field type="text" id="sn" name="sn"
                                        disabled={values.type === 'Consumable' ? true : false} placeholder={values.type === 'Consumable' ? "Not applicable" : "S/N"} error={errors.sn} as={StoreInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Type<span>*</span></label>
                                    <Field onClick={() => values.sn = ''} className={classNames(s.inputs__block__select, errors.type && s.error)} type="text" id="type" name="type"
                                        placeholder="Type" error={errors.type} as="select">
                                        <option value="">No value</option>
                                        <option value="Tool">Tool</option>
                                        <option value="Equipment">Equipment</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Location<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.location && s.error)} type="text" id="location" name="location"
                                        placeholder="Type" error={errors.location} as="select">
                                        <option value="">No value</option>
                                        <option value="Sharjah">Sharjah</option>
                                        <option value="Manas">Manas</option>
                                        <option value="Aqaba">Aqaba</option>
                                        <option value="Ras-Al-Khaima">Ras-Al-Khaima</option>
                                        <option value="Ajman">Ajman</option>
                                        <option value="Shop">Shop</option>
                                        <option value="EX-37017">EX-37017</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Rack<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.rack && s.error)} type="text" id="rack" name="rack"
                                        error={errors.rack} as="select">
                                        <option value="">No value</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Shelf<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.shelf && s.error)} type="text" id="shelf" name="shelf"
                                        error={errors.shelf} as="select">
                                        <option value="">No value</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Quantity<span>*</span></label>
                                    <Field className={s.inputs__block__number} type="number" id="quantity" name="quantity"
                                        placeholder="quantity" error={errors.quantity} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Calibration<span></span></label>
                                    <Field type="date" id="calibration" name="calibration"
                                        placeholder="" error={errors.calibration} as={StoreInput} />
                                </div>
                            </div>
                            <div className={s.textAreas}>
                                <div className={s.textAreas__block}>
                                    <label>Description<span>*</span></label>
                                    <Field type="text" id="desc" name="desc"
                                        placeholder="Description" error={errors.desc} as={StoreTextArea} />
                                </div>
                                <div className={s.textAreas__block}>
                                    <label>Remarks<span></span></label>
                                    <Field type="text" id="remarks" name="remarks"
                                        placeholder="Remarks" error={errors.remarks} as={StoreTextArea} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.newUnitForm__buttons} >
                        <Button text="Back" btnType="button" color="white" handler={() => isNewForm(false)} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    )
}

export default NewToolForm;