import { useDispatch } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./NewUnitForm.module.scss"
import { AppDispatch } from "../../../../store/store";
import { createUnit } from "../../../../store/reducers/storeReducer/storeReducer";
import { Field, Form, Formik } from "formik";
import { ICreateUnitDto } from "../../../../store/reducers/storeReducer/storeReducerTypes";
import { useState } from "react";
import StoreInput from "../../../../common/inputs/StoreInput";
import StoreTextArea from "../../../../common/inputs/StoreTextArea";
import classNames from "classnames";

type NewUnitFormPropsType = {
    isNewForm: (isNewWorm: boolean) => void;
}

const NewUnitForm: React.FC<NewUnitFormPropsType> = ({ isNewForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    return (
        <Formik
            initialValues={{
                ata: '',
                pn: '',
                altPn: '',
                sn: '',
                type: '',
                desc: '',
                grn: '',
                quantity: 0,
                eapack: '',
                location: '',
                rack: '',
                shelf: '',
                condition: '',
                lifelimit: '',
                shelflife: '',
                remarks: ''
            }}
            validate={values => {
                interface ICreateUnitErrorsDto {
                    ata?: string;
                    pn?: string;
                    sn?: string;
                    type?: string;
                    desc?: string;
                    quantity?: string;
                    eapack?: string;
                    location?: string;
                    condition?: string;
                    certificate?: string;
                }
                const errors: ICreateUnitErrorsDto = {};
                if (!values.ata) errors.ata = 'ATA is required';
                if (!values.pn) errors.pn = 'P/N is required';
                if (!values.sn && values.type === 'Rotable') errors.sn = 'Serial number is required';
                if (!values.type) errors.type = 'Type is required';
                if (!values.desc) errors.desc = 'Description is required';
                if (!values.quantity) errors.quantity = 'Quantity is required';
                if (!values.eapack) errors.eapack = 'EA / Pack is required';
                if (!values.location) errors.location = 'Location is required';
                if (!values.condition) errors.condition = 'Condition is required';
                //if (!values.remarks) errors.remarks = 'Remarks is required';
                return errors;
            }}
            onSubmit={(values: ICreateUnitDto) => {
                (async () => {
                    if (values.type === 'Consumable') values.sn = '';
                    setIsLoader(true);
                    await dispatch(createUnit(values));
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
                            <h3 className={s.section__header}>Add Item</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>P/N<span>*</span></label>
                                    <Field type="text" id="pn" name="pn"
                                        placeholder="P/N" error={errors.pn} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Alt. P/N<span>*</span></label>
                                    <Field type="text" id="altPn" name="altPn"
                                        placeholder="Alt. P/N" as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>S/N<span>*</span></label>
                                    <Field type="text" id="sn" name="sn"
                                        disabled={values.type === 'Consumable' ? true : false} placeholder={values.type === 'Consumable' ? "Not applicable" : "S/N"} error={errors.sn} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>ATA<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.ata && s.error)} type="text" id="ata" name="ata"
                                        placeholder="25" error={errors.ata} as="select">
                                        <option value="N/A">No value</option>
                                        <option value="00">00 GENERAL </option>
                                        <option value="21">21 AIR CONDITIONING </option>
                                        <option value="22">22 AUTOFLIGHT </option>
                                        <option value="23">23 COMMUNICATIONS </option>
                                        <option value="24">24 ELECTRICAL POWER</option>
                                        <option value="25">25 EQUIPMENT/FURNISHINGS</option>
                                        <option value="26">26 FIRE PROTECTION</option>
                                        <option value="27">27 FLIGHT CONTROLS</option>
                                        <option value="28">28 FUEL</option>
                                        <option value="29">29 HYDRAULIC POWER</option>
                                        <option value="30">30 ICE AND RAIN PROTECTION</option>
                                        <option value="31">31 INDICATING</option>
                                        <option value="32">32 LANDING GEAR</option>
                                        <option value="33">33 LIGHTS</option>
                                        <option value="34">34 NAVIGATION</option>
                                        <option value="35">35 OXYGEN</option>
                                        <option value="36">36 PNEUMATIC</option>
                                        <option value="38">38 WATER/WASTE</option>
                                        <option value="47">47 INERT GAS SYSTEM</option>
                                        <option value="49">49 AUXILIARY POWER UNIT</option>
                                        <option value="51">51 STRUCTURES</option>
                                        <option value="52">52 DOORS</option>
                                        <option value="53">53 FUSELAGE</option>
                                        <option value="54">54 NACELLES/PYLONS</option>
                                        <option value="55">55 STABILIZERS</option>
                                        <option value="56">56 WINDOWS</option>
                                        <option value="57">57 WINGS</option>
                                        <option value="71">71 POWER PLANT</option>
                                        <option value="72">72 ENGINE</option>
                                        <option value="73">73 ENGINE FUEL AND CONTROL</option>
                                        <option value="74">74 IGNITION</option>
                                        <option value="75">75 AIR</option>
                                        <option value="76">76 ENGINE CONTROLS</option>
                                        <option value="77">77 ENGINE INDICATING</option>
                                        <option value="78">78 EXHAUST</option>
                                        <option value="79">79 OIL</option>
                                        <option value="80">80 STARTING</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Type<span>*</span></label>
                                    <Field onClick={()=> values.sn = ''} className={classNames(s.inputs__block__select, errors.type && s.error)} type="text" id="type" name="type"
                                        placeholder="Type" error={errors.type} as="select">
                                        <option value="">No value</option>
                                        <option value="Rotable">Rotable</option>
                                        <option value="Consumable">Consumable</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Condition<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.condition && s.error)} type="text" id="condition" name="condition"
                                        placeholder="Condition" error={errors.condition} as="select">
                                        <option value="">No value</option>
                                        <option value="Inspected">Inspected</option>
                                        <option value="New">New</option>
                                        <option value="Overhauled">Overhauled</option>
                                        <option value="Repaired">Repaired</option>
                                        <option value="Unserviceable">Unserviceable</option>
                                        <option value="Serviceable(AR)">Serviceable(AR)</option>
                                        <option value="Scrap">Scrap</option>
                                    </Field>
                                </div>
                                <div className={s.inputs__block}>
                                    <label>EA/Pack<span>*</span></label>
                                    <Field className={classNames(s.inputs__block__select, errors.eapack && s.error)} type="text" id="eapack" name="eapack"
                                        placeholder="Type" error={errors.eapack} as="select">
                                        <option value="">No value</option>
                                        <option value="EA">EA</option>
                                        <option value="Pack">Pack</option>
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
                                    <label>GRN<span></span></label>
                                    <Field type="text" id="grn" name="grn"
                                        placeholder="grn" error={errors.grn} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Quantity<span>*</span></label>
                                    <Field className={s.inputs__block__number} type="number" id="quantity" name="quantity"
                                        placeholder="quantity" error={errors.quantity} as={StoreInput} />
                                </div>
                                <div className={s.inputs__block}>
                                    <label>Life Limit<span></span></label>
                                    <Field type="date" id="lifelimit" name="lifelimit"
                                        placeholder="" error={errors.lifelimit} as={StoreInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Shelf Life<span></span></label>
                                    <Field type="date" id="shelflife" name="shelflife"
                                        placeholder="" error={errors.shelflife} as={StoreInput} />
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

export default NewUnitForm;