import { Field, Form, Formik } from "formik";
import s from "./NewLimit.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import { ChangeEvent, useState } from "react";

export interface INewLimitDto {
    msn: string;
    section: string;
    part: string;
    pn: string;
    sn: string;
    tsn?: string;
    csn?: string;
    csnLim?: string;
    csnLim1?: string;
    csnLim2: string;
    csnLim3?: string;
    tsnLim?: string;
    tsnLim1?: string;
    tsnLim2?: string;
    tsnLim3?: string;
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

const NewEngineLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const engineErrorMessage = useSelector((state: RootState) => state.engine.errorMessage);
    const [tsnLim1, setTsnLim1] = useState(false);
    const [tsnLim2, setTsnLim2] = useState(false);
    const [tsnLim3, setTsnLim3] = useState(false);

    const [csnLim1, setCsnLim1] = useState(false);
    const [csnLim2, setCsnLim2] = useState(false);
    const [csnLim3, setCsnLim3] = useState(false);


    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Limit</h1>
            <Formik
                initialValues={{
                    msn: '',
                    section: '211',
                    part: 'SPOOL-BOOSTER',
                    pn: '335-009-306-0',
                    sn: 'DA432292',
                    tsn: '25050:00',
                    csn: '25050',
                    csnLim1: '24900',
                    csnLim2: '20100',
                    csnLim3: '20100',
                    tsnLim1: '24900:00',
                    tsnLim2: '20100:00',
                    tsnLim3: '20100:00',
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
                        tsnLim?: string;
                        tsnLim1?: string;
                        tsnLim2?: string;
                        tsnLim3?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.section) errors.section = 'Engine section is required';
                    if (!values.part) errors.part = 'Part description is required';
                    if (!values.pn) errors.pn = 'Part Number is required';
                    if (!values.sn) errors.sn = 'Serial Number is required';
                }}
                onSubmit={(values: INewLimitDto) => {
                    (async () => {
                        if (engine.msn) values.msn = engine.msn;
                        console.log(values);
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
                                <label>TSN Live Limit 1<span>*</span></label>
                                <Field type="text" id="tsnLim1" name="tsnLim1" disabled={tsnLim1 ? false : true}
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
                                <label>TSN Live Limit 2<span>*</span></label>
                                <Field type="text" id="tsnLim2" name="tsnLim2" disabled={tsnLim2 ? false : true}
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
                                <label>TSN Live Limit 3<span>*</span></label>
                                <Field type="text" id="tsnLim3" name="tsnLim3" disabled={tsnLim3 ? false : true}
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
                                <label>CSN Live Limit 1<span>*</span></label>
                                <Field type="text" id="csnLim1" name="csnLim1" disabled={tsnLim1 ? false : true}
                                    placeholder="10526:00" error={errors.csnLim1} as={Input} />
                            </div>

                        </div>

                        <div className={s.checkboxes__block}>
                            <div className={s.checkboxes__wrap}>
                                <label>CSN Live Limit 2</label>
                                <Input className={s.checkboxes__block__item} onChange={(e: ChangeEvent<HTMLInputElement>) => setTsnLim2(e.target.checked)}
                                    type="checkbox" id="csnLim2Checkbox" name="csnLim2Checkbox" />
                            </div>
                            <div className={s.inputs__block}>
                                <label>CSN Live Limit 2<span>*</span></label>
                                <Field type="text" id="csnLim2" name="csnLim2" disabled={tsnLim2 ? false : true}
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
                                <label>CSN Live Limit 3<span>*</span></label>
                                <Field type="text" id="tsnLim3" name="tsnLim3" disabled={tsnLim3 ? false : true}
                                    placeholder="10526" error={errors.tsnLim3} as={Input} />
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