import { Field, Form, Formik } from "formik";
import s from "./NewGearLimit.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import { addLimit } from "../../../../../store/reducers/gearReducer/gearReducer";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";

export interface INewGearLimitDto {
    gearSn: string;
    gearTsn: string;
    gearCsn: string;
    item: string;
    part: string;
    pn: string;
    sn: string;
    instDate: string;
    initTsn: string;
    initCsn: string;
    tsn: string;
    csn: string;
    instCsn: string;
    tsnLim: string;
    csnLim: string;
}

const NewGearLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const gear = useSelector((state: RootState) => state.gear.choosedGear);
    const gearErrorMessage = useSelector((state: RootState) => state.gear.errorMessage);

    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Live Limit</h1>
            <Formik
                initialValues={{
                    gearSn: '',
                    gearTsn: gear.tsn ? gear.tsn : '25005:00',
                    gearCsn: '44396',
                    item: '1',

                    part: 'SPOOL-BOOSTER',
                    pn: '335-009-306-0',
                    sn: 'DA432292',
                    instDate: '28-7-2005',
                    initTsn: '28738:00',
                    initCsn: '28738',
                    tsn: '28738:00',
                    csn: '28738',
                    instCsn: '30000',
                    tsnLim: '30000:00',
                    csnLim: '30000',
                }}
                validate={values => {
                    interface INewLimitErrorsDto {
                        gearSn?: string;
                        gearTsn?: string;
                        gearCsn?: string;
                        item?: string;
                        part?: string;
                        pn?: string;
                        sn?: string;
                        instDate?: string;
                        initTsn?: string;
                        initCsn?: string;
                        tsn?: string;
                        csn?: string;
                        instCsn?: string;
                        tsnLim?: string;
                        csnLim?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.gearTsn) errors.gearTsn = 'Gear TSN is required';
                    if (!values.gearCsn) errors.gearCsn = 'Gear CSN is required';
                    if (!values.part) errors.part = 'Part description is required';
                    if (!values.item) errors.item = 'item Number is required';
                    if (!values.pn) errors.pn = 'Part Number is required';
                    if (!values.sn) errors.sn = 'Serial Number is required';

                    if (!values.instDate) errors.instDate = 'Part instalation data is required';
                    if (!values.instCsn) errors.instCsn = 'CSN at part instalation is required';
                    if (!values.instCsn && !checkFCFormat(values.instCsn)) errors.instCsn = 'Invalid format, the format should be like "123456"';

                    if (!values.tsn) errors.tsn = 'Part TSN is required';
                    if (!values.tsn && !checkFHFormat(values.tsn)) errors.tsn = 'Invalid format, the format should be like "123456:00"';
                    if (!values.csn) errors.csn = 'Part CSN is required';
                    if (!values.csn && !checkFCFormat(values.csn)) errors.csn = 'Invalid format, the format should be like "123456"';

                    if (!values.tsnLim) errors.tsnLim = 'Life limit is required';
                    if (!values.tsnLim && !checkFHFormat(values.tsnLim)) errors.tsnLim = 'Invalid format, the format should be like "123456:00"';
                    if (!values.csnLim) errors.csnLim = 'Life limit is required';
                    if (!values.csnLim && !checkFHFormat(values.csnLim)) errors.csnLim = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(values: INewGearLimitDto) => {
                    (async () => {
                        if (gear.sn) values.gearSn = gear.sn;
                        values.initTsn = values.tsn;
                        values.initCsn = values.csn;
                        dispatch(addLimit(values));
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
                            <h3 className={s.inputs__section__header}>General data</h3>
                            <div className={s.inputs__block}>
                                <label>Gear TSN<span>*</span></label>
                                <Field type="text" id="gearTsn" name="gearTsn"
                                    placeholder={gear.tsn} error={errors.gearTsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Gear CSN<span>*</span></label>
                                <Field type="text" id="gearCsn" name="gearCsn"
                                    placeholder={gear.csn} error={errors.gearCsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Part Description<span>*</span></label>
                                <Field type="text" id="part" name="part"
                                    placeholder="part" error={errors.part} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Item Number<span>*</span></label>
                                <Field type="text" id="item" name="item"
                                    placeholder="1" error={errors.item} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Part Number<span>*</span></label>
                                <Field type="text" id="pn" name="pn"
                                    placeholder="pn" error={errors.pn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Serial Number<span>*</span></label>
                                <Field type="text" id="sn" name="sn"
                                    placeholder="sn" error={errors.sn} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Installation data</h3>
                            <div className={s.inputs__block}>
                                <label>Part Instalation Date<span>*</span></label>
                                <Field type="date" id="instDate" name="instDate"
                                    placeholder="" error={errors.instDate} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Part CSN at Instalation<span>*</span></label>
                                <Field type="text" id="instCsn" name="instCsn"
                                    placeholder="30000" error={errors.instCsn} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Operating data</h3>
                            <div className={s.inputs__block}>
                                <label>Part TSN<span>*</span></label>
                                <Field type="text" id="tsn" name="tsn"
                                    placeholder="25050:00" error={errors.tsn} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Part CSN<span>*</span></label>
                                <Field type="text" id="csn" name="csn"
                                    placeholder="25050" error={errors.csn} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Life Limits</h3>
                            <div className={s.inputs__block}>
                                <label>Part Life Limit Time<span>*</span></label>
                                <Field type="text" id="tsnLim" name="tsnLim"
                                    placeholder="25050:00" error={errors.tsnLim} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Part Life Limit Cycles<span>*</span></label>
                                <Field type="text" id="csnLim" name="csnLim"
                                    placeholder="25050" error={errors.csnLim} as={Input} />
                            </div>
                        </div>
                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/gear/${gear.sn}`)} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div >
    )
}

export default compose(withSuccessMessage)(NewGearLimit);