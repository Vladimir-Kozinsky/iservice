import { Field, Form, Formik } from "formik";
import s from "./InstallApu.module.scss";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { CSSTransition } from "react-transition-group";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Select, { ActionMeta, SingleValue } from "react-select";
import { IApu } from "../../../../../types/types";
import { getEngines } from "../../../../../store/reducers/engineReducer/engineReducer";
import Input from "../../../../../common/inputs/Input";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../../../HOC/wirhErrorMessage";
import { getApus } from "../../../../../store/reducers/apuReducer/apuReducer";
import { installApu } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";

export interface IInstallApuDto {
    date: string;
    action: string;
    aircraft: string | null;
    apu: string;
    aircraftTsn: string | null;
    aircraftCsn: string | null;
    apuTsn: string;
    apuCsn: string;
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



const InstallApu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const apus = useSelector((state: RootState) => state.apu.apus);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const options: IOption[] = apus.map((apu: IApu) => {
        return {
            value: apu.msn,
            label: `${apu.type} ${apu.msn}`
        }
    })

    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const findApu = (msn: string): IApu | null => {
        const apu = apus.find((apu: IApu) => apu.msn === msn);
        if (!apu) return null;
        return apu;
    }



    useEffect(() => {
        dispatch(getApus());
    }, [])

    return (
        <div className={s.installEngine}>
            <h1 className={s.installEngine__header} >Install APU</h1>
            <Formik
                initialValues={{
                    date: '',
                    action: 'Installation',
                    aircraft: aircraft.msn,
                    apu: selectedOption,
                    aircraftTsn: aircraft.fh,
                    aircraftCsn: aircraft.fc,
                    apuTsn: findApu(selectedOption)?.tsn,
                    apuCsn: findApu(selectedOption)?.csn,
                    reason: 'none'
                } as IInstallApuDto}
                validate={values => {
                    interface IInstallErrorsDto {
                        date?: string;
                        action?: string;
                        aircraft?: string;
                        apu?: string;
                        aircraftTsn?: string;
                        aircraftCsn?: string;
                        apuTsn?: string;
                        apuCsn?: string;
                        reason?: string;
                    }
                    const errors: IInstallErrorsDto = {};
                    if (!values.date) errors.date = 'Installation date is required';
                    if (!values.action) errors.action = 'Action is required';
                    if (!values.aircraft) errors.aircraft = 'Aircaft is required';
                    if (!selectedOption) errors.apu = 'Engine is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft FH is required';
                    if (values.aircraftTsn && !checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft FC is required';
                    if (values.aircraftCsn && !checkFCFormat(values.aircraftCsn)) errors.aircraftCsn = 'Invalid format, the format should be like "123456"';


                    if (!values.apuTsn) errors.apuTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.apuTsn)) errors.apuTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.apuCsn) errors.apuCsn = 'Engine CSN is required';
                    if (!checkFCFormat(values.apuCsn)) errors.apuCsn = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(values: IInstallApuDto) => {
                    (async () => {
                        values.apu = selectedOption;
                        console.log(values)
                       await dispatch(installApu(values));
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
                                <Field type="text" id="action" name="action"
                                    placeholder="installation" disabled error={errors.action} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>APU removal reason<span></span></label>
                                <Field type="text" id="reason" name="reason"
                                    placeholder="none" error={errors.reason}
                                    disabled as={Input} />
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
                                <label>APU<span>*</span></label>
                                <Select options={options} onChange={onChangeOption} styles={customStyles} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>APU TSN<span>*</span></label>
                                <Field type="text" id="apuTsn" name="apuTsn"
                                    placeholder={findApu(selectedOption)?.tsn} error={errors.apuTsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>APU CSN<span>*</span></label>
                                <Field type="text" id="apuCsn" name="apuCsn"
                                    placeholder={findApu(selectedOption)?.csn} error={errors.apuCsn} as={Input} />
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

const EnhancedComponent = withSuccessMessage(InstallApu);

export default compose(withErrorMessage)(EnhancedComponent);