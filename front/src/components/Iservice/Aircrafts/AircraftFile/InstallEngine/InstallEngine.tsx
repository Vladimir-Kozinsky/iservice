import { Field, Form, Formik } from "formik";
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
import Input from "../../../../../common/inputs/Input";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { installEngine } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";

export interface IInstallEngineDto {
    date: string;
    action: string;
    aircraft: string | null;
    engine: string;
    position: string;
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

const actionOptions: IOption[] = [
    { value: 'removal', label: 'Removal' },
    { value: 'installation', label: 'Installation' }
]



const InstallEngine: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const engines = useSelector((state: RootState) => state.engine.engines);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [selectedActionOption, setSelectedActionOption] = useState<string>('');

    const actionOptions: IOption[] = [
        { value: 'removal', label: 'Removal' },
        { value: 'installation', label: 'Installation' }
    ]

    const options: IOption[] = engines.map((engine: IEngine) => {
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

    const onChangeActionOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedActionOption(newValue.value);
        }
    }

    const findEngine = (msn: string) => {
        const engine = engines.find((eng: IEngine) => eng.msn === msn);
        return engine
    }



    useEffect(() => {
        dispatch(getEngines());
    }, [])

    return (
        <div className={s.installEngine}>
            <h1 className={s.installEngine__header} >Install Engine</h1>
            <Formik
                initialValues={{
                    date: '',
                    action: 'Install',
                    aircraft: aircraft.msn,
                    engine: '',
                    position: '1',
                    aircraftTsn: aircraft.fh,
                    aircraftCsn: aircraft.fc,
                    engineTsn: '',
                    engineCsn: '',
                    reason: ''
                }}
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
                    if (!selectedActionOption) errors.action = 'Action is required';
                    if (!values.aircraft) errors.aircraft = 'Aircaft is required';
                    if (!selectedOption) errors.engine = 'Engine is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft FH is required';
                    if (values.aircraftTsn && !checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft FC is required';
                    if (values.aircraftCsn && !checkFCFormat(values.aircraftCsn)) errors.aircraftCsn = 'Invalid format, the format should be like "123456"';


                    if (!values.engineTsn) errors.engineTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.engineTsn)) errors.engineTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.engineCsn) errors.engineCsn = 'Engine CSN is required';
                    if (!checkFCFormat(values.engineCsn)) errors.engineCsn = 'Invalid format, the format should be like "123456"';
                    if (!values.reason && selectedActionOption === 'removal') errors.reason = 'Removal reason is required';
                    return errors;
                }}
                onSubmit={(values: IInstallEngineDto) => {
                    (async () => {
                        values.action = selectedActionOption;
                        values.engine = selectedOption;
                        await dispatch(installEngine(values));
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
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>General</h3>
                            <div className={s.inputs__block}>
                                <label>Installation Date<span>*</span></label>
                                <Field type="date" id="date" name="date"
                                    placeholder="" error={errors.date} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Action<span>*</span></label>
                                <Select options={actionOptions} onChange={onChangeActionOption} styles={customStyles} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine removal reason<span></span></label>
                                <Field type="text" id="reason" name="reason"
                                    placeholder="Overhaul" error={errors.reason}
                                    disabled={selectedActionOption && selectedActionOption === 'removal'
                                        ? false
                                        : true} as={Input} />
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
                                <Field type="number" id="position" name="position"
                                    placeholder='1' error={errors.position} max='4' min='1' as={Input} />
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
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default InstallEngine;