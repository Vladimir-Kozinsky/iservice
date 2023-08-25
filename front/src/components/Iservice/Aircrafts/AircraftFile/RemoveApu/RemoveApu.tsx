import { Field, Form, Formik } from "formik";
import s from "./RemoveApu.module.scss";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../../../HOC/wirhErrorMessage";
import { removeApu } from "../../../../../store/reducers/aircraftReducer/aircraftReducer";

export interface IRemoveApuDto {
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

const RemoveApu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);

    return (
        <div className={s.installEngine}>
            <h1 className={s.installEngine__header} >Removal Engine</h1>
            <Formik
                initialValues={{
                    date: '',
                    action: 'Removal',
                    aircraft: aircraft.msn,
                    apu: aircraft.apu.msn ,
                    aircraftTsn: aircraft.fh,
                    aircraftCsn: aircraft.fc,
                    apuTsn: aircraft.apu.tsn,
                    apuCsn: aircraft.apu.csn,
                    reason: ''
                } as IRemoveApuDto}
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
                    if (!values.apu) errors.apu = 'APU is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft FH is required';
                    if (values.aircraftTsn && !checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft FC is required';
                    if (values.aircraftCsn && !checkFCFormat(values.aircraftCsn)) errors.aircraftCsn = 'Invalid format, the format should be like "123456"';

                    if (!values.reason) errors.reason = 'APU removal reason is required';
                    if (!values.apuTsn) errors.apuTsn = 'APU TSN is required';
                    if (!checkFHFormat(values.apuTsn)) errors.apuTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.apuCsn) errors.apuCsn = 'APU CSN is required';
                    if (!checkFCFormat(values.apuCsn)) errors.apuCsn = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(values: IRemoveApuDto) => {
                    (async () => {
                       await dispatch(removeApu(values));
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
                                <label>APU removal reason<span>*</span></label>
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
                                <label>APU<span>*</span></label>
                                <Field type="text" id="apu" name="apu"
                                    placeholder={aircraft.apu.msn} value={aircraft.apu.msn} disabled error={errors.apu} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine TSN<span>*</span></label>
                                <Field type="text" id="apuTsn" name="apuTsn"
                                    placeholder={aircraft.apu.tsn} error={errors.apuTsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Engine CSN<span>*</span></label>
                                <Field type="text" id="apuCsn" name="apuCsn"
                                    placeholder={aircraft.apu.csn} error={errors.apuCsn} as={Input} />
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

const EnhancedComponent = withSuccessMessage(RemoveApu);

export default compose(withErrorMessage)(EnhancedComponent);