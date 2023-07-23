import { Field, Form, Formik, FormikHelpers } from "formik";
import Input from "../../../../common/inputs/Input";
import s from "./NewEngineForm.module.scss";
import { CSSTransition, Transition } from "react-transition-group";
import Button from "../../../../common/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useRef, useState } from "react"
import { addAircraft } from "../../../../store/reducers/aircraftReducer/aircraftReducer";
import Loader from "../../../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ICreateEngineDto } from "../../../../types/types";
import { addEngine } from "../../../../store/reducers/engineReducer/engineReducer";


const NewEngineForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const engineErrorMessage = useSelector((state: RootState) => state.engine.errorMessage);
    const nodeRef = useRef(null);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const navigate = useNavigate();
    return (
        <div className={s.newEngineForm}>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <h1 className={s.newEngineForm__header} >Add new Engine</h1>
            <Formik
                initialValues={{
                    type: 'CFM56-3B1',
                    msn: '21745',
                    manufDate: '1989-01-30',
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
                        msn?: string;
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
                    if (!values.msn) errors.msn = 'Engine MSN is required';
                    if (!values.manufDate) errors.manufDate = 'Engine manufacture date is required';
                    if (!values.tsn) errors.tsn = 'Engine Time Since New is required';
                    if (!values.csn) errors.csn = 'Engine Cycles Since New is required';
                    return errors;
                }}
                onSubmit={(values: ICreateEngineDto) => {
                    (async () => {
                        setIsLoader(true);
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
                    <CSSTransition
                        in={engineErrorMessage ? true : false}
                        nodeRef={nodeRef}
                        timeout={500}
                        classNames={{
                            ...s,
                            enterActive: s['enter-active'],
                        }}
                        unmountOnExit
                    >
                        <div ref={nodeRef} className={s.newEngineForm__message}>{engineErrorMessage}</div>
                    </CSSTransition>

                    <div className={s.inputs}>
                        <div className={s.inputs__block}>
                            <label>Type<span>*</span></label>
                            <Field type="type" id="type" name="type"
                                placeholder="CFM56-3B1" error={errors.type} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>MSN<span>*</span></label>
                            <Field type="msn" id="msn" name="msn"
                                placeholder="22983" error={errors.msn} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Manufacture Date<span>*</span></label>
                            <Field type="manufDate" id="manufDate" name="manufDate"
                                placeholder="1996-01-30" error={errors.manufDate} as={Input} />
                        </div>
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
                        <div className={s.inputs__block}>
                            <label>Number of engine overhauls</label>
                            <Field type="overhaulNum" id="overhaulNum" name="overhaulNum"
                                placeholder="2" error={errors.overhaulNum} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>Last overhaul date</label>
                            <Field type="lastOverhaulDate" id="lastOverhaulDate" name="lastOverhaulDate"
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
                    <div className={s.btns}>
                        <Button text="Add" color="green" btnType="submit" />
                        <Button text="Back" color="white"
                            handler={() => navigate('/i-service/engines')} btnType={"button"} />
                    </div>
                </Form>
            )}
            </Formik>

        </div >
    )
}


export default NewEngineForm;