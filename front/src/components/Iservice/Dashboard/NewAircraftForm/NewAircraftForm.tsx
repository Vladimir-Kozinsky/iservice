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

export interface ICreateAircraftDto {
    type: string;
    msn: string;
    regNum: string;
    manufDate: string;
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
                    type: 'IL-76',
                    msn: '2106',
                    regNum: 'EX-76009',
                    manufDate: '1989-01-30',
                    initFh: '45231:00',
                    initFc: '4523',
                    fh: '',
                    fc: '',
                    overhaulNum: 1,
                    lastOverhaulDate: '1999-01-30',
                    tsnAtLastOverhaul: '22231:00',
                    csnAtLastOverhaul: '2323'
                }}
                validate={values => {
                    interface ICreateAircraftErrorsDto {
                        type?: string;
                        msn?: string;
                        regNum?: string;
                        manufDate?: string;
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
                    if (!values.regNum) errors.regNum = 'Aircraft registartion number is required';
                    if (!values.manufDate) errors.manufDate = 'Aircraft manufacture date is required';
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
                        <div className={s.inputs__block}>
                            <label>Type<span>*</span></label>
                            <Field type="type" id="type" name="type"
                                placeholder="737-400" error={errors.type} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>MSN<span>*</span></label>
                            <Field type="msn" id="msn" name="msn"
                                placeholder="25983" error={errors.msn} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>Reg. Number<span>*</span></label>
                            <Field type="regNum" id="regNum" name="regNum"
                                placeholder="A6-DTO" error={errors.regNum} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>Manufacture Date<span>*</span></label>
                            <Field type="manufDate" id="manufDate" name="manufDate"
                                placeholder="1996-01-30" error={errors.manufDate} as={Input} />
                        </div>
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
                    <div className={s.btns}>
                        <Button text="Add" color="green" btnType="submit" />
                        <Button text="Back" color="white"
                            handler={() => navigate('/i-service/aircrafts') } btnType={"button"} />
                    </div>
                </Form>
            )}
            </Formik>

        </div >
    )
}


export default NewAircraftForm;