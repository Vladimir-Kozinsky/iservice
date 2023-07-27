import { Form, Formik } from "formik";
import s from "./InstallEngine.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { CSSTransition } from "react-transition-group";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Select, { ActionMeta, SingleValue } from "react-select";
import { IEngine } from "../../../../../types/types";
import { getEngines } from "../../../../../store/reducers/engineReducer/engineReducer";

export interface IInstallEngineDto {
    msn: string | null,
    engineMsn: string,
}

interface IOption {
    value: string | null;
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



const InstallEngine: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const engines = useSelector((state: RootState) => state.engine.engines);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const options: IOption[] = engines.map((engine: IEngine) => {
        return { value: engine.msn, label: `${engine.type} ${engine.msn}` }
    })

    useEffect(() => {
        dispatch(getEngines());
    }, [])

    return (
        <div className={s.installEngine}>
            <h1 className={s.installEngine__header} >Install Engine</h1>
            <Formik
                initialValues={{
                    msn: aircraft.msn,
                    engineMsn: '',
                }}
                validate={values => {
                    interface INewLimitErrorsDto {
                        engineMsn?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.engineMsn) errors.engineMsn = 'Engine is required';
                    return errors;
                }}
                onSubmit={(values: IInstallEngineDto) => {
                    (async () => {
                        values.msn = aircraft.msn;
                        //await dispatch(installEngine(values));
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

export default InstallEngine;