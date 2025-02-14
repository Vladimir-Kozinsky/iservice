import { Field, Form, Formik } from "formik";
import s from "./NewCfm56Limit.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import { ChangeEvent, useState } from "react";
import { checkFCFormat, checkFHFormat } from "../../../../../utils/utils";
import { addLimit } from "../../../../../store/reducers/engineReducer/engineReducer";

export interface INewLimitDto {
    esn: string;
    section: string;
    part: string;
    pn: string;
    sn: string;
    tsn?: string;
    csn?: string;
    csnLim?: string;
    csnLim1?: string;
    csnLim2?: string;
    csnLim3?: string;
    tsnLim1?: string;
    tsnLim2?: string;
    tsnLim3?: string;
}

const NewEngineLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const engineErrorMessage = useSelector((state: RootState) => state.engine.errorMessage);
    const [isTsnLim1, setTsnLim1] = useState(false);
    const [isTsnLim2, setTsnLim2] = useState(false);
    const [isTsnLim3, setTsnLim3] = useState(false);

    const [isCsnLim1, setCsnLim1] = useState(false);
    const [isCsnLim2, setCsnLim2] = useState(false);
    const [isCsnLim3, setCsnLim3] = useState(false);


    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Limit</h1>
            <Formik
                initialValues={{
                    esn: '',
                    section: '211',
                    part: 'SPOOL-BOOSTER',
                    pn: '335-009-306-0',
                    sn: 'DA432292',
                    tsn: '25050:00',
                    csn: '25050',
                    csnLim1: '',
                    csnLim2: '',
                    csnLim3: '',
                    tsnLim1: '',
                    tsnLim2: '',
                    tsnLim3: '',
                }}
                validate={values => {
                    interface INewLimitErrorsDto {
                        section?: string;
                        part?: string;
                        pn?: string;
                        sn?: string;
                        tsn?: string;
                        csn?: string;
                        csnLim?: string;
                        csnLim1?: string;
                        csnLim2?: string;
                        csnLim3?: string;
                        tsnLim1?: string;
                        tsnLim2?: string;
                        tsnLim3?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.section) errors.section = 'Engine section is required';
                    if (!values.part) errors.part = 'Part description is required';
                    if (!values.pn) errors.pn = 'Part Number is required';
                    if (!values.sn) errors.sn = 'Serial Number is required';

                    if (!values.tsnLim1 && isTsnLim1) errors.tsnLim1 = 'Life limit is required';
                    if (values.tsnLim1 && !checkFHFormat(values.tsnLim1)) errors.tsnLim1 = 'Invalid format, the format should be like "123456:22"';
                    if (!values.tsnLim2 && isTsnLim2) errors.tsnLim2 = 'Life limit is required';
                    if (values.tsnLim2 && !checkFHFormat(values.tsnLim2)) errors.tsnLim2 = 'Invalid format, the format should be like "123456:22"';
                    if (!values.tsnLim3 && isTsnLim3) errors.tsnLim3 = 'Life limit is required';
                    if (values.tsnLim3 && !checkFHFormat(values.tsnLim3)) errors.tsnLim3 = 'Invalid format, the format should be like "123456:22"';

                    if (!values.csnLim1 && isCsnLim1) errors.csnLim1 = 'Life limit is required';
                    if (values.csnLim1 && !checkFCFormat(values.csnLim1)) errors.csnLim1 = 'Invalid format, the format should be like "123456:22"';
                    if (!values.csnLim2 && isCsnLim2) errors.csnLim2 = 'Life limit is required';
                    if (values.csnLim2 && !checkFCFormat(values.csnLim2)) errors.csnLim2 = 'Invalid format, the format should be like "123456:22"';
                    if (!values.csnLim3 && isCsnLim3) errors.csnLim3 = 'Life limit is required';
                    if (values.csnLim3 && !checkFCFormat(values.csnLim3)) errors.csnLim3 = 'Invalid format, the format should be like "123456:22"';

                    return errors;
                }}
                onSubmit={(values: INewLimitDto) => {
                    (async () => {
                        if (engine.msn) values.esn = engine.msn;
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
                        <div className={s.inputs__block}>
                            <label>Section<span>*</span></label>
                            <Field type="text" id="section" name="section"
                                placeholder="Section" error={errors.section} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>Part Description<span>*</span></label>
                            <Field type="text" id="part" name="part"
                                placeholder="part" error={errors.part} as={Input} />
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
                        <div className={s.inputs__block}>
                            <label>Time Since New<span>*</span></label>
                            <Field type="text" id="tsn" name="tsn"
                                placeholder="tsn" error={errors.tsn} as={Input} />
                        </div>
                        <div className={s.inputs__block}>
                            <label>Cycles Since New<span>*</span></label>
                            <Field type="text" id="csn" name="csn"
                                placeholder="csn" error={errors.csn} as={Input} />
                        </div>

                    </div>
                    <div className={s.checkboxes}>
                        <h3 className={s.checkboxes__title}>TSN Live Limit</h3>
                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>TSN Live Limit 1</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setTsnLim1(e.target.checked)}
                                    type="checkbox" id="tsnLim1Checkbox" name="tsnLim1Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>TSN Live Limit 1</label>
                                <Field type="text" id="tsnLim1" name="tsnLim1" disabled={isTsnLim1 ? false : true}
                                    placeholder="10526:00" error={errors.tsnLim1} as={Input} />
                            </div>
                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>TSN Live Limit 2</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setTsnLim2(e.target.checked)}
                                    type="checkbox" id="tsnLim2Checkbox" name="tsnLim2Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>TSN Live Limit 2</label>
                                <Field type="text" id="tsnLim2" name="tsnLim2" disabled={isTsnLim2 ? false : true}
                                    placeholder="10526:00" error={errors.tsnLim2} as={Input} />
                            </div>
                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>TSN Live Limit 3</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setTsnLim3(e.target.checked)}
                                    type="checkbox" id="tsnLim3Checkbox" name="tsnLim3Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>TSN Live Limit 3</label>
                                <Field type="text" id="tsnLim3" name="tsnLim3" disabled={isTsnLim3 ? false : true}
                                    placeholder="10526" error={errors.tsnLim3} as={Input} />
                            </div>
                        </div>
                    </div>
                    <div className={s.checkboxes}>
                        <h3 className={s.checkboxes__title}>CSN Live Limit</h3>
                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>CSN Live Limit 1</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setCsnLim1(e.target.checked)}
                                    type="checkbox" id="csnLim1Checkbox" name="csnLim1Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>CSN Live Limit 1</label>
                                <Field type="text" id="csnLim1" name="csnLim1" disabled={isCsnLim1 ? false : true}
                                    placeholder="10526:00" error={errors.csnLim1} as={Input} />
                            </div>

                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>CSN Live Limit 2</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setCsnLim2(e.target.checked)}
                                    type="checkbox" id="csnLim2Checkbox" name="csnLim2Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>CSN Live Limit 2</label>
                                <Field type="text" id="csnLim2" name="csnLim2" disabled={isCsnLim2 ? false : true}
                                    placeholder="10526:00" error={errors.csnLim2} as={Input} />
                            </div>
                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>CSN Live Limit 3</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setCsnLim3(e.target.checked)}
                                    type="checkbox" id="csnLim3Checkbox" name="csnLim3Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>CSN Live Limit 3</label>
                                <Field type="text" id="csnLim3" name="csnLim3" disabled={isCsnLim3 ? false : true}
                                    placeholder="10526" error={errors.csnLim3} as={Input} />
                            </div>
                        </div>
                    </div>
                    <div className={s.btns}>
                        <Button text="Back" color="white"
                            handler={() => navigate(`/i-service/engine/${engine.msn}`)} btnType={"button"} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default compose(withSuccessMessage)(NewEngineLimit);