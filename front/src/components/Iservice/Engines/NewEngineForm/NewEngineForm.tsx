import { Field, Form, Formik, FormikHelpers } from "formik";
import Input from "../../../../common/inputs/Input";
import s from "./NewEngineForm.module.scss";
import { Transition } from "react-transition-group";
import Button from "../../../../common/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useRef, useState } from "react"
import Loader from "../../../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ICreateEngineDto } from "../../../../types/types";
import { addEngine } from "../../../../store/reducers/engineReducer/engineReducer";
import withSuccessMessage from "../../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../../HOC/wirhErrorMessage";
import { compose } from "@reduxjs/toolkit";
import { checkFCFormat, checkFHFormat } from "../../../../utils/utils";


const NewEngineForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const engineErrorMessage = useSelector((state: RootState) => state.engine.errorMessage);
    const nodeRef = useRef(null);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const navigate = useNavigate();
    const trustCompr = (thrust: string): boolean => {
        switch (thrust) {
            case '20000':
                return false;
            case '22000':
                return false;
            case '23500':
                return false;
            default:
                return true;
        }
    }
    return (
        <div className={s.newEngineForm}>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <h1 className={s.newEngineForm__header} >Add new Engine</h1>
            <Formik
                initialValues={{
                    type: 'CFM56-3B1',
                    thrust: '20000',
                    msn: '21745',
                    manuf: 'CFM',
                    manufDate: '1989-01-30',
                    initFh: '64353:00',
                    initFc: '41705',
                    tsn: '45600:00',
                    csn: '21456',
                    overhaulNum: 1,
                    lastOverhaulDate: '1999-01-30',
                    tsnAtLastOverhaul: '22231:00',
                    csnAtLastOverhaul: '2323'
                }}
                validate={values => {
                    interface ICreateAircraftErrorsDto {
                        type?: string;
                        thrust?: string;
                        msn?: string;
                        manuf?: string;
                        manufDate?: string;
                        tsn?: string;
                        csn?: string;
                        overhaulNum?: number;
                        lastOverhaulDate?: string;
                        tsnAtLastOverhaul?: string;
                        csnAtLastOverhaul?: string;
                    }
                    const errors: ICreateAircraftErrorsDto = {};
                    if (!values.type) errors.type = 'Engine type is required';
                    if (!values.thrust) errors.thrust = 'Engine thrust is required';
                    if (trustCompr(values.thrust)) errors.thrust = 'Invalid thrust, the thrust should be 20000 or 22000 or 23500';
                    if (!values.msn) errors.msn = 'Engine MSN is required';
                    if (!values.manuf) errors.manuf = 'Engine manufactur is required';
                    if (!values.manufDate) errors.manufDate = 'Engine manufacture date is required';
                    if (!values.tsn) errors.tsn = 'Engine Time Since New is required';
                    if (!values.tsn && !checkFHFormat(values.tsn)) errors.tsn = 'Invalid format, the format should be like "123456:00"';
                    if (!values.csn) errors.csn = 'Engine Cycles Since New is required';
                    if (!values.csn && !checkFCFormat(values.csn)) errors.csn = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(values: ICreateEngineDto) => {
                    (async () => {
                        setIsLoader(true);
                        values.initFh = values.tsn;
                        values.initFc = values.csn;
                        await dispatch(addEngine(values));
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
                <Form className={s.newEngineForm__container}>
                    <div className={s.inputs}>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>General</h3>
                            <div className={s.inputs__block}>
                                <label>Type<span>*</span></label>
                                <Field type="type" id="type" name="type"
                                    placeholder="CFM56-3B1" error={errors.type} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine Thrust Rating, Lbs<span>*</span></label>
                                <Field type="text" id="thrust" name="thrust"
                                    placeholder="20000" error={errors.thrust} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>MSN<span>*</span></label>
                                <Field type="msn" id="msn" name="msn"
                                    placeholder="22983" error={errors.msn} as={Input} />
                            </div>

                            <div className={s.inputs__block}>
                                <label>Manufacturer<span>*</span></label>
                                <Field type="manuf" id="manuf" name="manuf"
                                    placeholder="CFM" error={errors.manuf} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Manufacture Date<span>*</span></label>
                                <Field type="date" id="manufDate" name="manufDate"
                                    placeholder="1996-01-30" error={errors.manufDate} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Operational data</h3>
                            <div className={s.inputs__block}>
                                <label>Time Since New<span>*</span></label>
                                <Field type="tsn" id="tsn" name="tsn"
                                    placeholder="45236:00" error={errors.tsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Cycles Since New<span>*</span></label>
                                <Field type="csn" id="csn" name="csn"
                                    placeholder="45236" error={errors.csn} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Overhaul data</h3>
                            <div className={s.inputs__block}>
                                <label>Last overhaul date</label>
                                <Field type="date" id="lastOverhaulDate" name="lastOverhaulDate"
                                    placeholder="2022-01-30" error={errors.lastOverhaulDate} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>TSN at last overhaul</label>
                                <Field type="tsnAtLastOverhaul" id="tsnAtLastOverhaul" name="tsnAtLastOverhaul"
                                    placeholder="45231:00" error={errors.tsnAtLastOverhaul} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>CSN at last overhaul</label>
                                <Field type="csnAtLastOverhaul" id="csnAtLastOverhaul" name="csnAtLastOverhaul"
                                    placeholder="4523" error={errors.csnAtLastOverhaul} as={Input} />
                            </div>
                        </div>
                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate('/i-service/engines')} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>

        </div >
    )
}

const EnhancedComponent = withSuccessMessage(NewEngineForm);

export default compose(withErrorMessage)(EnhancedComponent);
