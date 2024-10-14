import { Field, Form, Formik } from "formik";
import s from "./NewLeg.module.scss";
import { ICreateLegDto } from "../../../../../store/reducers/legReducer/legReducerTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { IEngine } from "../../../../../types/types";
import Input from "../../../../../common/inputs/Input";
import Button from "../../../../../common/buttons/Button";
import { useNavigate } from "react-router-dom";
import { calcTime } from "../../../../../utils/utils";
import { createLeg } from "../../../../../store/reducers/legReducer/legReducer";
import { compose } from "@reduxjs/toolkit";
import withErrorMessage from "../../../../../HOC/wirhErrorMessage";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";


const NewLeg = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const installedEngines = useSelector((state: RootState) => state.aircraft.installedEngines);
    const engines = installedEngines.map((engine: IEngine) => {
        return {
            msn: engine.msn,
        }
    })

    const onChangeTime = (e: any, setFieldValue: any, values: any) => {
        const takeOff = e.target.id === 'takeOff' ? e.target.value : values.takeOff;
        const landing = e.target.id === 'landing' ? e.target.value : values.landing;
        const blockOff = e.target.id === 'blockOff' ? e.target.value : values.blockOff;
        const blockOn = e.target.id === 'blockOn' ? e.target.value : values.blockOn;
        const date = e.target.id === 'depDate' ? e.target.value : values.depDate;
        const flightTime = calcTime(date, takeOff, landing);
        setFieldValue(`${e.target.id}`, e.target.value);
        setFieldValue('flightTime', flightTime);
        setFieldValue('blockTime', calcTime(date, blockOff, blockOn));
        if (e.target.id === 'takeOff' || e.target.id === 'landing') {
            onChangeFH(setFieldValue, flightTime);
        }
    }

    const onChangeFH = (setFieldValue: any, flightTime: any) => {
        const fh = aircraft.fh ? aircraft.fh : "0:00";
        const fc = aircraft.fc ? aircraft.fc : "00";
        const currentTimemm = (+fh.split(':')[0] * 60) + (+fh.split(':')[1]);
        const newTimemm = (+flightTime.split(':')[0] * 60) + (+flightTime.split(':')[1]);
        const totalTimemm = currentTimemm + newTimemm;
        const hh = Math.floor(totalTimemm / 60);
        const mm = totalTimemm % 60;
        setFieldValue('fh', `${hh}:${mm}`);
        setFieldValue('fc', `${+fc + 1}`);
    }



    return (
        <div className={s.leg} >
            <h1 className={s.leg__header} >New Leg</h1>
            <Formik
                initialValues={{
                    aircraft: '',
                    engines: engines,
                    apu: '',
                    depDate: '',
                    flightNumber: '',
                    from: '',
                    to: '',
                    blockOff: '',
                    takeOff: '',
                    landing: '',
                    blockOn: '',
                    flightTime: '',
                    blockTime: '',
                    fh: '',
                    fc: '',
                }}
                validate={values => {
                    interface INewLimitErrorsDto {

                    }
                    const errors: INewLimitErrorsDto = {};

                    return errors;
                }}
                onSubmit={(values: ICreateLegDto) => {
                    (async () => {
                        values.aircraft = aircraft.msn;
                        values.apu = aircraft.apu.msn;
                        values.engines = engines;
                        console.log(values);
                        await dispatch(createLeg(values));
                    })()

                }}
            >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
            }) => (
                <Form className={s.leg__container}>
                    <div className={s.inputs}>
                        <div className={s.inputs__block}>
                            <label>Depature date<span>*</span></label>
                            <Field type="date" id="depDate" name="depDate"
                                placeholder="" onChange={(e: any) => onChangeTime(e, setFieldValue, values)} error={errors.depDate} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Flight Number<span>*</span></label>
                            <Field type="text" id="flightNumber" name="flightNumber"
                                placeholder="Flight Number" error={errors.flightNumber} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Depature Airport<span>*</span></label>
                            <Field type="text" id="from" name="from"
                                placeholder="Depature Airport" error={errors.from} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Destination Airport<span>*</span></label>
                            <Field type="text" id="to" name="to"
                                placeholder="Destination Airport" error={errors.to} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Block Off<span>*</span></label>
                            <Field type="time" id="blockOff" name="blockOff"
                                placeholder="Block Off" error={errors.blockOff}
                                onChange={(e: any) => onChangeTime(e, setFieldValue, values)}
                                as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Take Off<span>*</span></label>
                            <Field type="time" id="takeOff" name="takeOff"
                                placeholder="Take Off" error={errors.takeOff}
                                onChange={(e: any) => onChangeTime(e, setFieldValue, values)}
                                as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Landing<span>*</span></label>
                            <Field type="time" id="landing" name="landing"
                                placeholder="Landing" error={errors.landing}
                                onChange={(e: any) => onChangeTime(e, setFieldValue, values)}
                                as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Block On<span>*</span></label>
                            <Field type="time" id="blockOn" name="blockOn"
                                placeholder="Block On" error={errors.blockOn}
                                onChange={(e: any) => onChangeTime(e, setFieldValue, values)}
                                as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Flight Time<span>*</span></label>
                            <Field type="text" id="flightTime" name="flightTime"
                                placeholder="" disabled error={errors.flightTime} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>Block Time<span>*</span></label>
                            <Field type="text" id="blockTime" name="blockTime"
                                placeholder="" disabled error={errors.blockTime} as={Input} />
                        </div>

                        <div className={s.inputs__block}>
                            <label>FH<span>*</span></label>
                            <Field type="text" id="fh" name="fh"
                                placeholder="" disabled error={errors.fh} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>FC<span>*</span></label>
                            <Field type="text" id="fc" name="fc"
                                placeholder="" disabled error={errors.fc} as={Input} />
                        </div>

                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/aircraft/${aircraft.msn}/legs`)} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div >
    )
}

const EnhancedComponent = withSuccessMessage(NewLeg);

export default compose(withErrorMessage)(EnhancedComponent);