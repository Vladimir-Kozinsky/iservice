import { Field, Form, Formik } from "formik";
import s from "./DelEngineLimit.module.scss";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { ActionMeta, SingleValue } from "react-select";
import { compose } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../../store/store";
import { ILimit } from "../../../../types/types";
import Button from "../../../../common/buttons/Button";
import withSuccessMessage from "../../../../HOC/wirhSuccessMessage";
import { delLimit } from "../../../../store/reducers/engineReducer/engineReducer";

export interface IDelEngineLimitDto {
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

const DelEngineLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const engineErrorMessage = useSelector((state: RootState) => state.engine.errorMessage);
    const [selectedOption, setSelectedOption] = useState<string>('');


    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const options: IOption[] = engine.limits.map((limit: ILimit) => {
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
                        limitId?: string
                    }
                    const errors: IDelLimitErrorsDto = {};
                    if (!selectedOption) errors.limitId = "Limit id should not be empty"
                    return errors;
                }}
                onSubmit={(values: IDelEngineLimitDto) => {
                    (async () => {
                        if (engine.msn) values.msn = engine.msn;
                        values.limitId = selectedOption;
                        dispatch(delLimit(values));
                        setSelectedOption('');
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
                        in={engineErrorMessage ? true : false}
                        nodeRef={nodeRef}
                        timeout={500}
                        classNames={{
                            ...s,
                            enterActive: s['enter-active'],
                        }}
                        unmountOnExit
                    >
                        <div ref={nodeRef} className={s.newAircraftForm__message}>{engineErrorMessage}</div>
                    </CSSTransition>

                    <div className={s.inputs}>
                        <div className={s.inputs__block}>
                            <label>Dependence<span>*</span></label>
                            <Select options={options} onChange={onChangeOption} styles={customStyles} />
                        </div>
                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/engine/${engine.msn}`)} btnType={"button"} />
                        <Button text="Delete" color="red" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default compose(withSuccessMessage)(DelEngineLimit);