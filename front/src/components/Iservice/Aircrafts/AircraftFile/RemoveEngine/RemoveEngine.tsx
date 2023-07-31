import { Field, Form, Formik } from "formik";
import s from "./RemoveEngine.module.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { CSSTransition } from "react-transition-group";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Select, { ActionMeta, SingleValue } from "react-select";
import { IEngine } from "../../../../../types/types";
import { getEngines } from "../../../../../store/reducers/engineReducer/engineReducer";
import Input from "../../../../../common/inputs/Input";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { installEngine, removeEngine } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../../../HOC/wirhErrorMessage";

export interface IRemoveEngineDto {
    date: string;
    action: string;
    aircraft: string | null;
    engine: string;
    position: number | null | undefined;
    aircraftTsn: string | null;
    aircraftCsn: string | null;
    engineTsn: string;
    engineCsn: string;
    reason: string;
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

const RemoveEngine: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const options: IOption[] = aircraft.engines.map((engine: IEngine) => {
        return {
            value: engine.msn,
            label: `${engine.type} ${engine.msn}`
        }
    })

    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const findEngine = (msn: string): IEngine | null => {
        const engine = aircraft.engines.find((eng: IEngine) => eng.msn === msn);
        if (!engine) return null;
        return engine;
    }

    return (
        <div className={s.installEngine}>
            <h1 className={s.installEngine__header} >Removal Engine</h1>
            <Formik
                initialValues={{
                    date: '',
                    action: 'Removal',
                    aircraft: aircraft.msn,
                    engine: selectedOption,
                    position: findEngine(selectedOption)?.position,
                    aircraftTsn: aircraft.fh,
                    aircraftCsn: aircraft.fc,
                    engineTsn: findEngine(selectedOption)?.tsn,
                    engineCsn: findEngine(selectedOption)?.csn,
                    reason: ''
                } as IRemoveEngineDto}
                validate={values => {
                    interface IInstallErrorsDto {
                        date?: string;
                        action?: string;
                        aircraft?: string;
                        engine?: string;
                        position?: string;
                        aircraftTsn?: string;
                        aircraftCsn?: string;
                        engineTsn?: string;
                        engineCsn?: string;
                        reason?: string;
                    }
                    const errors: IInstallErrorsDto = {};
                    if (!values.date) errors.date = 'Installation date is required';
                    if (!values.action) errors.action = 'Action is required';
                    if (!values.aircraft) errors.aircraft = 'Aircaft is required';
                    if (!selectedOption) errors.engine = 'Engine is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft FH is required';
                    if (values.aircraftTsn && !checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft FC is required';
                    if (values.aircraftCsn && !checkFCFormat(values.aircraftCsn)) errors.aircraftCsn = 'Invalid format, the format should be like "123456"';

                    if (!values.reason) errors.reason = 'Engine removal reason is required';
                    if (!values.engineTsn) errors.engineTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.engineTsn)) errors.engineTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.engineCsn) errors.engineCsn = 'Engine CSN is required';
                    if (!checkFCFormat(values.engineCsn)) errors.engineCsn = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(values: IRemoveEngineDto) => {
                    (async () => {
                        values.engine = selectedOption;
                        values.position = findEngine(selectedOption)?.position;
                        await dispatch(removeEngine(values));
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
                    <div className={s.inputs}>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>General</h3>
                            <div className={s.inputs__block}>
                                <label>Removal Date<span>*</span></label>
                                <Field type="date" id="date" name="date"
                                    placeholder="" error={errors.date} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Action<span>*</span></label>
                                <Field type="text" id="action" name="action"
                                    placeholder="installation" disabled error={errors.action} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine removal reason<span>*</span></label>
                                <Field type="text" id="reason" name="reason"
                                    placeholder="none" error={errors.reason}
                                    as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Aircraft Data</h3>
                            <div className={s.inputs__block}>
                                <label>Aircraft<span>*</span></label>
                                <Field type="text" id="aircraft" name="aircraft"
                                    placeholder={aircraft.msn} error={errors.aircraft} disabled as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Aircraft FH<span>*</span></label>
                                <Field type="text" id="aircraftTsn" name="aircraftTsn"
                                    placeholder={aircraft.fh} error={errors.aircraftTsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Aircraft FC<span>*</span></label>
                                <Field type="text" id="aircraftCsn" name="aircraftCsn"
                                    placeholder={aircraft.fc} error={errors.aircraftCsn} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Engine Data</h3>
                            <div className={s.inputs__block}>
                                <label>Engine<span>*</span></label>
                                <Select options={options} onChange={onChangeOption} styles={customStyles} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Position<span>*</span></label>
                                <Field type="text" id="position" name="position"
                                    placeholder={findEngine(selectedOption)?.position} disabled error={errors.position} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine TSN<span>*</span></label>
                                <Field type="text" id="engineTsn" name="engineTsn"
                                    placeholder={findEngine(selectedOption)?.tsn} error={errors.engineTsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine CSN<span>*</span></label>
                                <Field type="text" id="engineCsn" name="engineCsn"
                                    placeholder={findEngine(selectedOption)?.csn} error={errors.engineCsn} as={Input} />
                            </div>
                        </div>
                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/aircraft/${aircraft.msn}`)} btnType={"button"} />
                        <Button text="Remove" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div >
    )
}

const EnhancedComponent = withSuccessMessage(RemoveEngine);

export default compose(withErrorMessage)(EnhancedComponent);