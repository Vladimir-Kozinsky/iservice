import { Field, Form, Formik } from "formik";
import Input from "../../../../common/inputs/Input";
import s from "./NewGearForm.module.scss";
import { CSSTransition, Transition } from "react-transition-group";
import Button from "../../../../common/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useRef, useState } from "react"
import Loader from "../../../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ICreateGearDto } from "../../../../types/types";
import { addGear } from "../../../../store/reducers/gearReducer/gearReducer";
import withSuccessMessage from "../../../../HOC/wirhSuccessMessage";
import { compose } from "@reduxjs/toolkit";
import withErrorMessage from "../../../../HOC/wirhErrorMessage";


const NewGearForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const navigate = useNavigate();
    return (
        <div className={s.newGearForm}>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <h1 className={s.newGearForm__header} >Add new Gear Strut</h1>
            <Formik
                initialValues={{
                    pos: 'NLG',
                    pn: '65-73762-21',
                    sn: 'BN0876',
                    initFh: '64353:00',
                    initFc: '41705',
                    tsn: '4523:00',
                    csn: '45600',
                    lastInspDate: '2024-01-30',
                    tsnAtLastInsp: '4523:00',
                    csnAtLastInsp: '4523',
                    nextInspDate: '25.05.2028',
                    tsnAtNextInsp: '4523:00',
                    csnAtNextInsp: '2323',
                }}
                validate={values => {
                    interface ICreateGearErrorsDto {
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
                    const errors: ICreateGearErrorsDto = {};
                    if (!values.pos) errors.pos = 'LG position is required';
                    if (!values.pn) errors.pn = 'LG part number is required';
                    if (!values.sn) errors.sn = 'LG serial number is required';

                    if (!values.tsn) errors.tsn = 'LG Times Since New is required';
                    if (!values.csn) errors.csn = 'LG Cycles Since New is required';

                    if (!values.lastInspDate) errors.lastInspDate = 'Last inspection date is required';
                    if (!values.tsnAtLastInsp) errors.tsnAtLastInsp = 'FH at the time of last Inspection is required';
                    if (!values.csnAtLastInsp) errors.csnAtLastInsp = 'FC at the time of last Inspection is required';

                    if (!values.nextInspDate) errors.nextInspDate = 'LG Cycles Since New is required';
                    if (!values.tsnAtNextInsp) errors.tsnAtNextInsp = 'FH at the time of next Inspection is required';
                    if (!values.csnAtNextInsp) errors.csnAtNextInsp = 'FC at the time of next Inspection is required';
                    return errors;
                }}
                onSubmit={(values: ICreateGearDto) => {
                    (async () => {
                        setIsLoader(true);
                        values.initFh = values.tsn;
                        values.initFc = values.csn;
                        await dispatch(addGear(values));
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
                <Form className={s.newGearForm__container}>
                    <div className={s.inputs}>
                        <div className={s.inputs__block}>
                            <label>Position<span>*</span></label>
                            <Field type="pos" id="pos" name="pos"
                                placeholder="NLG" error={errors.pos} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>Part Number<span>*</span></label>
                            <Field type="pn" id="pn" name="pn"
                                placeholder="65-73762-21" error={errors.pn} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Serial Number<span>*</span></label>
                            <Field type="sn" id="sn" name="sn"
                                placeholder="BN0876" error={errors.sn} as={Input} />
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
                            <label>Last Inspection Date</label>
                            <Field type="date" id="lastInspDate" name="lastInspDate"
                                placeholder="2024-01-30" error={errors.lastInspDate} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>TSN at Last Inspection</label>
                            <Field type="tsnAtLastInsp" id="tsnAtLastInsp" name="tsnAtLastInsp"
                                placeholder="45231:00" error={errors.tsnAtLastInsp} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>CSN at Last Inspection</label>
                            <Field type="csnAtLastInsp" id="csnAtLastInsp" name="csnAtLastInsp"
                                placeholder="45231:00" error={errors.csnAtLastInsp} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Nest Inspection Date</label>
                            <Field type="date" id="nextInspDate" name="nextInspDate"
                                placeholder="2024-01-30" error={errors.nextInspDate} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>TSN at Next Inspection</label>
                            <Field type="tsnAtNextInsp" id="tsnAtNextInsp" name="tsnAtNextInsp"
                                placeholder="45231:00" error={errors.tsnAtNextInsp} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>CSN at Next Inspection</label>
                            <Field type="csnAtNextInsp" id="csnAtNextInsp" name="csnAtNextInsp"
                                placeholder="45231:00" error={errors.csnAtNextInsp} as={Input} />
                        </div>
                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate('/i-service/gears')} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>

        </div >
    )
}

const EnhancedComponent = withSuccessMessage(NewGearForm);
export default compose(withErrorMessage)(EnhancedComponent);