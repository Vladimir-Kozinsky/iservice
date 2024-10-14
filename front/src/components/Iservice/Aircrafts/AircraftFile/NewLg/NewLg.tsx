import { Field, Form, Formik } from "formik";
import s from "./NewLg.module.scss";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { addLg, addLimit } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";

export interface INewLgDto {
    msn: string;
    pos: string;
    pn: string;
    sn: string;
    tsn: string;
    csn: string;
    lastInspDate: string;
    tsnAtLastInsp: string;
    csnAtLastInsp: string;
    nextInspDate: string;
    tsnAtNextInsp: string;
    csnAtNextInsp: string;
}

const NewLg = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const [date, setDate] = useState(false);
    const [fh, setFh] = useState(false);
    const [fc, setFc] = useState(false);

    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Inspection</h1>
            <Formik
                initialValues={{
                    msn: '',
                    pos: '',
                    pn: '',
                    sn: '',
                    tsn: '',
                    csn: '',
                    lastInspDate: '',
                    tsnAtLastInsp: '',
                    csnAtLastInsp: '',
                    nextInspDate: '',
                    tsnAtNextInsp: '',
                    csnAtNextInsp: '',
                }}
                validate={values => {
                    interface INewLgErrorsDto {
                        msn?: string;
                        pos?: string;
                        pn?: string;
                        sn?: string;
                        tsn?: string;
                        csn?: string;
                        lastInspDate?: string;
                        tsnAtLastInsp?: string;
                        csnAtLastInsp?: string;
                        nextInspDate?: string;
                        tsnAtNextInsp?: string;
                        csnAtNextInsp?: string;
                    }
                    const errors: INewLgErrorsDto = {};
                    if (!values.pos) errors.pos = 'Limit Title is required';
                    if (values.pos.length > 15) errors.pos = 'Title lenfgth should be less then 15 characters';
                    if (!values.pos) errors.pos = 'Limit Title is required';
                    return errors;
                }}
                onSubmit={(values: INewLgDto) => {
                    (async () => {
                        if (aircraft.msn) values.msn = aircraft.msn;
                        await dispatch(addLg(values));
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
                            <label>LG Position<span>*</span></label>
                            <Field type="pos" id="pos" name="pos"
                                placeholder="LG Position" error={errors.pos} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>LG Part Number<span>*</span></label>
                            <Field type="pn" id="pn" name="pn"
                                placeholder="LG P/N" error={errors.pn} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>LG Serial Number<span>*</span></label>
                            <Field type="sn" id="sn" name="sn"
                                placeholder="LG S/N" error={errors.sn} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>TSN<span>*</span></label>
                            <Field type="tsn" id="tsn" name="tsn"
                                placeholder="10526:00" error={errors.tsn} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>CSN<span>*</span></label>
                            <Field type="csn" id="csn" name="csn"
                                placeholder="10526:00" error={errors.csn} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Date last inspection<span>*</span></label>
                            <Field type="date" id="lastInspDate" name="lastInspDate"
                                placeholder="25.05.2024" error={errors.lastInspDate} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>TSN at last inspection<span>*</span></label>
                            <Field type="tsnAtLastInsp" id="tsnAtLastInsp" name="tsnAtLastInsp"
                                placeholder="10526:00" error={errors.tsnAtLastInsp} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>CSN at last inspection<span>*</span></label>
                            <Field type="csnAtLastInsp" id="csnAtLastInsp" name="csnAtLastInsp"
                                placeholder="10526" error={errors.csnAtLastInsp} as={Input} />
                        </div>
                    </div>

                    <div className={s.checkboxes}>
                        <h3 className={s.checkboxes__title}>Threshold</h3>
                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>Date</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.checked)}
                                    type="checkbox" id="dateCheckbox" name="dateCheckbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Next inspection date<span>*</span></label>
                                <Field type="date" id="nextInspDate" name="nextInspDate" disabled={date ? false : true}
                                    placeholder="25.05.2025" error={errors.nextInspDate} as={Input} />
                            </div>
                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>FH</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setFh(e.target.checked)}
                                    type="checkbox" id="tsnCheckbox" name="tsnCheckbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Next inspection FH<span>*</span></label>
                                <Field type="tsnAtNextInsp" id="tsnAtNextInsp" name="tsnAtNextInsp" disabled={fh ? false : true}
                                    placeholder="10526:00" error={errors.tsnAtNextInsp} as={Input} />
                            </div>
                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>FC</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setFc(e.target.checked)}
                                    type="checkbox" id="csnCheckbox" name="csnCheckbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Next inspection FC<span>*</span></label>
                                <Field type="csnAtNextInsp" id="csnAtNextInsp" name="csnAtNextInsp" disabled={fc ? false : true}
                                    placeholder="10526" error={errors.csnAtNextInsp} as={Input} />
                            </div>
                        </div>
                    </div>

                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/aircraft/${aircraft.msn}`)} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default compose(withSuccessMessage)(NewLg);