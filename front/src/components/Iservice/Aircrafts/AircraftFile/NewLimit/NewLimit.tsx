import { Field, Form, Formik } from "formik";
import s from "./NewLimit.module.scss";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import Select, { ActionMeta, SingleValue } from "react-select";
import { addLimit } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";

export interface INewLimitDto {
    msn: string,
    title: string;
    lastInspDate: string;
    tsnAtLastInsp: string;
    csnAtLastInsp: string;
    nextInspDate: string;
    tsnAtNextInsp: string;
    csnAtNextInsp: string;
    // dependence: string;
    // threshold: string;
}

interface IOption {
    value: string | null | undefined;
    label: string | null;
}

const customStyles = {
    option: (provided: any) => ({
        ...provided,
        borderBottom: '1px dotted pink',
    }),
    control: (provided: any) => ({
        ...provided,
        width: '232px',
        height: '38px',
        border: '#0A2640 2px solid',
        borderRadius: '24px',
        textAlign: 'center'
    }),
}

const NewLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
   // const [selectedOption, setSelectedOption] = useState<string>('');
    const [date, setDate] = useState(false);
    const [fh, setFh] = useState(false);
    const [fc, setFc] = useState(false);


    // const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
    //     if (newValue?.value) {
    //         setSelectedOption(newValue.value);
    //     }
    // }

    // const options: IOption[] = [
    //     { value: 'fh', label: 'Flight Hours' },
    //     { value: 'fc', label: 'Flight Cycles' },
    //     { value: 'date', label: 'Date' },
    // ]

    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Inspection</h1>
            <Formik
                initialValues={{
                    msn: '',
                    title: 'Life limit',
                    lastInspDate: '25.05.2024',
                    tsnAtLastInsp: '10526:00',
                    csnAtLastInsp: '10526',
                    nextInspDate: date ? '25.05.2025' : '',
                    tsnAtNextInsp: fh ? '10526:00' : '',
                    csnAtNextInsp: fc ? '10526' : '',
                    // dependence: 'fc',
                    // threshold: '45000'
                }}
                validate={values => {
                    interface INewLimitErrorsDto {
                        title?: string;
                        lastInspDate?: string;
                        tsnAtLastInsp?: string;
                        csnAtLastInsp?: string;
                        nextInspDate?: string;
                        tsnAtNextInsp?: string;
                        csnAtNextInsp?: string;
                        // dependence?: string;
                        // threshold?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.title) errors.title = 'Limit Title is required';
                    if (values.title.length > 15) errors.title = 'Title lenfgth should be less then 15 characters';
                    if (!values.title) errors.title = 'Limit Title is required';
                    if (!values.lastInspDate && date) errors.lastInspDate = 'Next inspection date is required';
                    if (!values.tsnAtNextInsp && fh) errors.tsnAtNextInsp = 'Next inspection FH is required';
                    if (!values.csnAtNextInsp && fc) errors.csnAtNextInsp = 'Next inspection FC is required';
                    // if (!values.dependence) errors.dependence = 'Dependence is required';

                    // switch (selectedOption) {
                    //     case "fh":
                    //         if (!checkFHFormat(values.threshold)) errors.threshold = 'Invalid format, the format should be like "123456:22"';
                    //         break;
                    //     case "fc":
                    //         if (!checkFCFormat(values.threshold)) errors.threshold = 'Invalid format, the format should be like "23456"';
                    //         break;
                    //     default:
                    //         break;
                    // }
                    return errors;
                }}
                onSubmit={(values: INewLimitDto) => {
                    (async () => {
                        // values.dependence = selectedOption;
                        if (aircraft.msn) values.msn = aircraft.msn;
                        await dispatch(addLimit(values));
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
                            <label>Inspection title<span>*</span></label>
                            <Field type="title" id="title" name="title"
                                placeholder="Life Limit" error={errors.title} as={Input} />
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





                    {/* <div className={s.inputs__block}>
                            <label>Dependence<span>*</span></label>
                            <Select options={options} onChange={onChangeOption} styles={customStyles} />
                        </div> */}

                    {/* <div className={s.inputs__block}>
                            <label>Threshold<span>*</span></label>
                            {selectedOption === 'date'
                                ? <Field type="date" id="threshold" name="threshold"
                                    placeholder="" error={errors.title} as={Input} />
                                : <Field type="threshold" id="threshold" name="threshold"
                                    placeholder="45000:00" error={errors.threshold} as={Input} />}
                        </div> */}


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

export default compose(withSuccessMessage)(NewLimit);