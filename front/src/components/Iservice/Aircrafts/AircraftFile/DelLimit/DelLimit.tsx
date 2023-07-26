import { Field, Form, Formik } from "formik";
import s from "./DelLimit.module.scss";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Select, { ActionMeta, SingleValue } from "react-select";
import { ILimit } from "../../../../../types/types";

export interface IDelLimitDto {
    msn: string;
    limitId: string;
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

const DelLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const [selectedOption, setSelectedOption] = useState<string>('');


    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const options: IOption[] = aircraft.limits.map((limit: ILimit) => {
        return {
            value: limit._id,
            label: limit.title,
        }
    })

    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >Delete Limit</h1>
            <Formik
                initialValues={{
                    msn: '',
                    limitId: '',
                }}
                validate={values => {
                    interface IDelLimitErrorsDto {
                        title?: string;
                        dependence?: string;
                        threshold?: string;
                    }
                    const errors: IDelLimitErrorsDto = {};

                    return errors;
                }}
                onSubmit={(values: IDelLimitDto) => {
                    (async () => {
                        if (aircraft.msn) values.msn = aircraft.msn;
                        values.limitId = selectedOption;
                        console.log(values);
                        //await dispatch(delLimit(values));
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
                            <label>Dependence<span>*</span></label>
                            <Select options={options} onChange={onChangeOption} styles={customStyles} />
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

export default DelLimit;