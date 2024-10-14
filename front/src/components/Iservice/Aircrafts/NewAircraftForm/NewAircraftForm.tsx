import { Field, Form, Formik, FormikHelpers } from "formik";
import Input from "../../../../common/inputs/Input";
import s from "./NewAircraftForm.module.scss";
import { CSSTransition, Transition } from "react-transition-group";
import Button from "../../../../common/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useRef, useState } from "react"
import { addAircraft } from "../../../../store/reducers/aircraftReducer/aircraftReducer";
import Loader from "../../../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../HOC/wirhSuccessMessage";

export interface ICreateAircraftDto {
    typeCert: string;
    type: string;
    msn: string;
    regNum: string;
    manufDate: string;
    code: string;
    mtow: string;
    mzfw: string;
    mlw?: string;
    mtw?: string;
    fuelCap?: string;
    bew?: string;
    cg?: string;
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    overhaulNum?: number;
    lastOverhaulDate?: string;
    tsnAtLastOverhaul?: string;
    csnAtLastOverhaul?: string;
}

const NewAircraftForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const aircraftErrorMessage = useSelector((state: RootState) => state.auth.errorMessage);
    const nodeRef = useRef(null);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const navigate = useNavigate();
    return (
        <div className={s.newAircraftForm}>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <h1 className={s.newAircraftForm__header} >Add new Aircraft</h1>
            <Formik
                initialValues={{
                    type: '737-31B',
                    msn: '27520',
                    regNum: 'EX-37017',
                    typeCert: 'A16WE',
                    code: '016',
                    manufDate: '1997-01-30',
                    mtow: '61234',
                    mzfw: '48307',
                    mlw: '51709',
                    mtw: '61461',
                    fuelCap: '20104',
                    bew: '20104',
                    cg: '1.04',
                    initFh: '64353:00',
                    initFc: '41705',
                    fh: '64353:00',
                    fc: '41705',
                    overhaulNum: 0,
                    lastOverhaulDate: '',
                    tsnAtLastOverhaul: '',
                    csnAtLastOverhaul: ''
                }}
                validate={values => {
                    interface ICreateAircraftErrorsDto {
                        type?: string;
                        msn?: string;
                        regNum?: string;
                        typeCert?: string;
                        code?: string;
                        manufDate?: string;
                        mtow?: string;
                        mzfw?: string;
                        mlw?: string;
                        mtw?: string;
                        fuelCap?: string;
                        bew?: string;
                        cg?: string;
                        initFh?: string;
                        initFc?: string;
                        fh?: string;
                        fc?: string;
                        overhaulNum?: number;
                        lastOverhaulDate?: string;
                        tsnAtLastOverhaul?: string;
                        csnAtLastOverhaul?: string;
                    }
                    const errors: ICreateAircraftErrorsDto = {};
                    if (!values.type) errors.type = 'Aircraft type is required';
                    if (!values.msn) errors.msn = 'Aircraft MSN is required';
                    if (!values.typeCert) errors.typeCert = 'Type certificate Number is required';
                    if (!values.regNum) errors.regNum = 'Aircraft registartion number is required';
                    if (!values.manufDate) errors.manufDate = 'Aircraft manufacture date is required';
                    if (!values.code) errors.code = 'Effectivity code is required';
                    if (!values.mtow) errors.mtow = 'MTOW is required';
                    if (!values.mzfw) errors.mzfw = 'MZFW is required';
                    if (!values.mlw) errors.mlw = 'Max Landing Weight is required';
                    if (!values.mtw) errors.mtw = 'Max taxi Weight is required';
                    if (!values.fuelCap) errors.fuelCap = 'Fuel Capacity';
                    if (!values.bew) errors.bew = 'Basic Empty Weight';
                    if (!values.initFh) errors.initFh = 'Aircraft initial FH is required';
                    if (!values.initFc) errors.initFc = 'Aircraft initial FC is required';
                    return errors;
                }}
                onSubmit={(values: ICreateAircraftDto) => {
                    (async () => {
                        values.fh = values.initFh;
                        values.fc = values.initFc;
                        console.log(values)
                        setIsLoader(true);
                        await dispatch(addAircraft(values));
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
                <Form className={s.newAircraftForm__container}>
                    <CSSTransition
                        in={aircraftErrorMessage ? true : false}
                        nodeRef={nodeRef}
                        timeout={500}
                        classNames={{
                            ...s,
                            enterActive: s['enter-active'],
                        }}
                        unmountOnExit
                    >
                        <div ref={nodeRef} className={s.newAircraftForm__message}>{aircraftErrorMessage}</div>
                    </CSSTransition>

                    <div className={s.inputs}>
                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Aircraft Info</h3>
                            <div className={s.inputs__block}>
                                <label>Reg. Number<span>*</span></label>
                                <Field type="regNum" id="regNum" name="regNum"
                                    placeholder="A6-DTO" error={errors.regNum} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Type<span>*</span></label>
                                <Field type="type" id="type" name="type"
                                    placeholder="737-400" error={errors.type} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Type certificate Number<span>*</span></label>
                                <Field type="typeCert" id="typeCert" name="typeCert"
                                    placeholder="A16WE" error={errors.typeCert} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Manufacture Date<span>*</span></label>
                                <Field type="manufDate" id="manufDate" name="manufDate"
                                    placeholder="1996-01-30" error={errors.manufDate} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>MSN<span>*</span></label>
                                <Field type="msn" id="msn" name="msn"
                                    placeholder="25983" error={errors.msn} as={Input} />
                            </div>

                            <div className={s.inputs__block}>
                                <label>Effectivity code<span>*</span></label>
                                <Field type="code" id="code" name="code"
                                    placeholder="016" error={errors.code} as={Input} />
                            </div>
                        </div>

                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Performance Data</h3>
                            <div className={s.inputs__block}>
                                <label>Max Take-Off Cross Weight<span>*</span></label>
                                <Field type="mtow" id="mtow" name="mtow"
                                    placeholder="61234" error={errors.mtow} as={Input} />
                            </div>

                            <div className={s.inputs__block}>
                                <label>Max Zero Fuel Weight<span>*</span></label>
                                <Field type="mzfw" id="mzfw" name="mzfw"
                                    placeholder="48307" error={errors.mzfw} as={Input} />
                            </div>

                            <div className={s.inputs__block}>
                                <label>Max Landing Weight<span>*</span></label>
                                <Field type="mlw" id="mlw" name="mlw"
                                    placeholder="51709" error={errors.mlw} as={Input} />
                            </div>

                            <div className={s.inputs__block}>
                                <label>Max Taxi Weight<span>*</span></label>
                                <Field type="mtw" id="mtw" name="mtw"
                                    placeholder="61461" error={errors.mtw} as={Input} />
                            </div>

                            <div className={s.inputs__block}>
                                <label>Fuel Capacity<span>*</span></label>
                                <Field type="fuelCap" id="fuelCap" name="fuelCap"
                                    placeholder="20104" error={errors.fuelCap} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Basic Empty Weight<span>*</span></label>
                                <Field type="bew" id="bew" name="bew"
                                    placeholder="31138" error={errors.bew} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Center of gravity<span>*</span></label>
                                <Field type="cg" id="cg" name="cg"
                                    placeholder="1.04" error={errors.cg} as={Input} />
                            </div>

                        </div>

                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Aircraft operating Info</h3>
                            <div className={s.inputs__block}>
                                <label>FH<span>*</span></label>
                                <Field type="initFh" id="initFh" name="initFh"
                                    placeholder="45236:00" error={errors.initFh} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>FC<span>*</span></label>
                                <Field type="initFc" id="initFc" name="initFc"
                                    placeholder="45236" error={errors.initFc} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Number of aircraft overhauls</label>
                                <Field type="overhaulNum" id="overhaulNum" name="overhaulNum"
                                    placeholder="2" error={errors.overhaulNum} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Last overhaul date</label>
                                <Field type="lastOverhaulDate" id="lastOverhaulDate" name="lastOverhaulDate"
                                    placeholder="2022-01-30" error={errors.lastOverhaulDate} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>FH at last overhaul</label>
                                <Field type="tsnAtLastOverhaul" id="tsnAtLastOverhaul" name="tsnAtLastOverhaul"
                                    placeholder="45231:00" error={errors.tsnAtLastOverhaul} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>FC at last overhaul</label>
                                <Field type="csnAtLastOverhaul" id="csnAtLastOverhaul" name="csnAtLastOverhaul"
                                    placeholder="4523" error={errors.csnAtLastOverhaul} as={Input} />
                            </div>
                        </div>

                    </div>
                    <div className={s.btns}>
                        <Button text="Add" color="green" btnType="submit" />
                        <Button text="Back" color="white"
                            handler={() => navigate('/i-service/aircrafts')} btnType={"button"} />
                    </div>
                </Form>
            )}
            </Formik>

        </div >
    )
}


export default compose(withSuccessMessage)(NewAircraftForm) ;