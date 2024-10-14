import { Field, Form, Formik } from "formik";
import s from "./NewApuLimit.module.scss";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import Select, { ActionMeta, SingleValue } from "react-select";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import { addLimit } from "../../../../../store/reducers/apuReducer/apuReducer";

export interface INewLimitDto {
    msn: string,
    title: string;
    dependence: string;
    threshold: string;
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

const NewApuLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const apu = useSelector((state: RootState) => state.apu.choosedApu);
    const apuErrorMessage = useSelector((state: RootState) => state.apu.errorMessage);
    const [selectedOption, setSelectedOption] = useState<string>('');


    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const options: IOption[] = [
        { value: 'fh', label: 'Flight Hours' },
        { value: 'fc', label: 'Flight Cycles' },
        { value: 'date', label: 'Date' },
    ]

    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Limit</h1>
            <Formik
                initialValues={{
                    msn: '',
                    title: 'Life limit',
                    dependence: 'fc',
                    threshold: '45000'
                }}
                validate={values => {
                    interface INewLimitErrorsDto {
                        title?: string;
                        dependence?: string;
                        threshold?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.title) errors.title = 'Limit Title is required';
                    if (values.title.length > 15) errors.title = 'Title lenfgth should be less then 15 characters';
                    if (!values.title) errors.title = 'Limit Title is required';
                    if (!values.dependence) errors.dependence = 'Dependence is required';

                    switch (selectedOption) {
                        case "fh":
                            if (!checkFHFormat(values.threshold)) errors.threshold = 'Invalid format, the format should be like "123456:22"';
                            break;
                        case "fc":
                            if (!checkFCFormat(values.threshold)) errors.threshold = 'Invalid format, the format should be like "23456"';
                            break;
                        default:
                            break;
                    }
                    return errors;
                }}
                onSubmit={(values: INewLimitDto) => {
                    (async () => {
                        values.dependence = selectedOption;
                        if (apu.msn) values.msn = apu.msn;
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
                        in={apuErrorMessage ? true : false}
                        nodeRef={nodeRef}
                        timeout={500}
                        classNames={{
                            ...s,
                            enterActive: s['enter-active'],
                        }}
                        unmountOnExit
                    >
                        <div ref={nodeRef} className={s.newAircraftForm__message}>{apuErrorMessage}</div>
                    </CSSTransition>

                    <div className={s.inputs}>

                        <div className={s.inputs__block}>
                            <label>Title<span>*</span></label>
                            <Field type="title" id="title" name="title"
                                placeholder="Life Limit" error={errors.title} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Dependence<span>*</span></label>
                            <Select options={options} onChange={onChangeOption} styles={customStyles} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Threshold<span>*</span></label>
                            {selectedOption === 'date'
                                ? <Field type="date" id="threshold" name="threshold"
                                    placeholder="" error={errors.title} as={Input} />
                                : <Field type="threshold" id="threshold" name="threshold"
                                    placeholder="45000:00" error={errors.threshold} as={Input} />}
                        </div>

                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/apu/${apu.msn}`)} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default compose(withSuccessMessage)(NewApuLimit);