import { Field, Form, Formik } from "formik";
import s from "./InstallGear.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { CSSTransition } from "react-transition-group";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Select, { ActionMeta, SingleValue } from "react-select";
import { IGear } from "../../../../../types/types";
import Input from "../../../../../common/inputs/Input";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../../../HOC/wirhErrorMessage";
import { getGears } from "../../../../../store/reducers/gearReducer/gearReducer";
import { installGear } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";

export interface IInstallGearDto {
    date: string;
    action: string;
    aircraft: string | null;
    gear: string;
    position: string;
    aircraftTsn: string | null;
    aircraftCsn: string | null;
    gearTsn: string;
    gearCsn: string;
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



const InstallGear: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const gears = useSelector((state: RootState) => state.gear.gears);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const options: IOption[] = gears.map((gear: IGear) => {
        return {
            value: gear.sn,
            label: `${gear.pos} ${gear.sn}`
        }
    })

    const onChangeOption = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }

    const findGear = (sn: string): IGear | null => {
        const gear = gears.find((gear: IGear) => gear.sn === sn);
        if (!gear) return null;
        return gear;
    }

    useEffect(() => {
        dispatch(getGears());
    }, [])

    return (
        <div className={s.installGear}>
            <h1 className={s.installGear__header} >Install APU</h1>
            <Formik
                initialValues={{
                    date: '',
                    action: 'Installation',
                    aircraft: aircraft.msn,
                    gear: selectedOption,
                    position: findGear(selectedOption)?.pos,
                    aircraftTsn: aircraft.fh,
                    aircraftCsn: aircraft.fc,
                    gearTsn: findGear(selectedOption)?.tsn,
                    gearCsn: findGear(selectedOption)?.csn,
                    reason: 'none'
                } as IInstallGearDto}
                validate={values => {
                    interface IInstallErrorsDto {
                        date?: string;
                        action?: string;
                        aircraft?: string;
                        gear?: string;
                        position?: string;
                        aircraftTsn?: string;
                        aircraftCsn?: string;
                        gearTsn?: string;
                        gearCsn?: string;
                        reason?: string;
                    }
                    const errors: IInstallErrorsDto = {};
                    if (!values.date) errors.date = 'Installation date is required';
                    if (!values.action) errors.action = 'Action is required';
                    if (!values.aircraft) errors.aircraft = 'Aircaft is required';
                    if (!selectedOption) errors.gear = 'Gear is required';
                    if (!values.position) errors.position = 'Aircaft is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft FH is required';
                    if (values.aircraftTsn && !checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft FC is required';
                    if (values.aircraftCsn && !checkFCFormat(values.aircraftCsn)) errors.aircraftCsn = 'Invalid format, the format should be like "123456"';


                    if (!values.gearTsn) errors.gearTsn = 'Gear TSN is required';
                    if (!checkFHFormat(values.gearTsn)) errors.gearTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.gearCsn) errors.gearCsn = 'Gear CSN is required';
                    if (!checkFCFormat(values.gearCsn)) errors.gearCsn = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(values: IInstallGearDto) => {
                    (async () => {
                        values.gear = selectedOption;
                        await dispatch(installGear(values));
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
                            <h3 className={s.inputs__section__header}>Gear Data</h3>
                            <div className={s.inputs__block}>
                                <label>Gear<span>*</span></label>
                                <Select options={options} onChange={onChangeOption} styles={customStyles} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Gear Position<span>*</span></label>
                                <Field type="text" id="position" name="position"
                                    placeholder={findGear(selectedOption)?.pos} error={errors.position} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Gear TSN<span>*</span></label>
                                <Field type="text" id="gearTsn" name="gearTsn"
                                    placeholder={findGear(selectedOption)?.tsn} error={errors.gearTsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Gear CSN<span>*</span></label>
                                <Field type="text" id="gearCsn" name="gearCsn"
                                    placeholder={findGear(selectedOption)?.csn} error={errors.gearCsn} as={Input} />
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

const EnhancedComponent = withSuccessMessage(InstallGear);

export default compose(withErrorMessage)(EnhancedComponent);