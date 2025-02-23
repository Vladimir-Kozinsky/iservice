import { Field, Form, Formik } from "formik";
import s from "./NewCfm56Limit.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { compose } from "@reduxjs/toolkit";
import withSuccessMessage from "../../../../../HOC/wirhSuccessMessage";
import { checkFCFormat } from "../../../../../utils/utils";
import { addLimit } from "../../../../../store/reducers/engineReducer/engineReducer";

export interface INewLimitDto {
    esn: string;
    engCsn: string;
    section: string;
    part: string;
    pn: string;
    sn: string;
    initCsnA: string;
    initCsnB: string;
    initCsnC: string;
    csnA: string;
    csnB: string;
    csnC: string;
    csnLimA: string;
    csnLimB: string;
    csnLimC: string;
}

const NewEngineLimit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const engineErrorMessage = useSelector((state: RootState) => state.engine.errorMessage);

    return (
        <div className={s.limit}>
            <h1 className={s.limit__header} >New Live Limit</h1>
            <Formik
                initialValues={{
                    esn: '',
                    engCsn: engine.csn ? engine.csn : '25005',
                    section: '211',
                    part: 'SPOOL-BOOSTER',
                    pn: '335-009-306-0',
                    sn: 'DA432292',
                    initCsnA: '28738',
                    initCsnB: '28738',
                    initCsnC: '28738',
                    csnA: '28738',
                    csnB: '28738',
                    csnC: '28738',
                    csnLimA: '30000',
                    csnLimB: '30000',
                    csnLimC: '30000',
                }}
                validate={values => {
                    interface INewLimitErrorsDto {
                        section?: string;
                        engCsn?: string;
                        part?: string;
                        pn?: string;
                        sn?: string;
                        tsn?: string;
                        initCsnA?: string;
                        initCsnB?: string;
                        initCsnC?: string;
                        csnA?: string;
                        csnB?: string;
                        csnC?: string;
                        csnLimA?: string;
                        csnLimB?: string;
                        csnLimC?: string;
                    }
                    const errors: INewLimitErrorsDto = {};
                    if (!values.section) errors.section = 'Engine section is required';
                    if (!values.engCsn) errors.engCsn = 'Engine CSN is required';
                    if (!values.part) errors.part = 'Part description is required';
                    if (!values.pn) errors.pn = 'Part Number is required';
                    if (!values.sn) errors.sn = 'Serial Number is required';


                    if (!values.csnA) errors.csnA = 'CSN is required';
                    if (!values.csnA && !checkFCFormat(values.csnA)) errors.csnA = 'Invalid format, the format should be like "123456"';
                    if (!values.csnB) errors.csnB = 'CSN is required';
                    if (!values.csnB && !checkFCFormat(values.csnB)) errors.csnB = 'Invalid format, the format should be like "123456"';
                    if (!values.csnC) errors.csnC = 'CSN is required';
                    if (!values.csnC && !checkFCFormat(values.csnC)) errors.csnC = 'Invalid format, the format should be like "123456"';

                    if (!values.csnLimA) errors.csnLimA = 'Life limit is required';
                    if (!values.csnLimA && !checkFCFormat(values.csnLimA)) errors.csnLimA = 'Invalid format, the format should be like "123456"';
                    if (!values.csnLimB) errors.csnLimB = 'Life limit is required';
                    if (!values.csnLimB && !checkFCFormat(values.csnLimB)) errors.csnLimB = 'Invalid format, the format should be like "123456"';
                    if (!values.csnLimC) errors.csnLimC = 'Life limit is required';
                    if (!values.csnLimC && !checkFCFormat(values.csnLimC)) errors.csnLimC = 'Invalid format, the format should be like "123456"';

                    return errors;
                }}
                onSubmit={(values: INewLimitDto) => {
                    (async () => {
                        if (engine.msn) values.esn = engine.msn;
                        values.initCsnA = values.csnA;
                        values.initCsnB = values.csnB;
                        values.initCsnC = values.csnC;
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
                                <label>Engine CSN<span>*</span></label>
                                <Field type="text" id="engCsn" name="engCsn"
                                    placeholder={engine.csn} error={errors.engCsn} as={Input} />
                            </div>
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
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Operation data</h3>
                            <div className={s.inputs__block}>
                                <label>Cycles Since New Cat. A<span>*</span></label>
                                <Field type="text" id="csnA" name="csnA"
                                    placeholder="25050" error={errors.csnA} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Cycles Since New Cat. B<span>*</span></label>
                                <Field type="text" id="csnB" name="csnB"
                                    placeholder="25050" error={errors.csnB} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Cycles Since New at. C<span>*</span></label>
                                <Field type="text" id="csnC" name="csnC"
                                    placeholder="25050" error={errors.csnC} as={Input} />
                            </div>
                        </div>
                        <div className={s.inputs__section} >
                            <h3 className={s.inputs__section__header}>Limits data</h3>
                            <div className={s.inputs__block}>
                                <label>Cycles Limit Cat. A<span>*</span></label>
                                <Field type="text" id="csnLimA" name="csnLimA"
                                    placeholder="25050" error={errors.csnLimA} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Cycles Limit Cat. B<span>*</span></label>
                                <Field type="text" id="csnLimB" name="csnLimB"
                                    placeholder="25050" error={errors.csnLimB} as={Input} />
                            </div>
                            <div className={s.inputs__block}>
                                <label>Cycles Limit Cat. C<span>*</span></label>
                                <Field type="text" id="csnLimC" name="csnLimC"
                                    placeholder="25050" error={errors.csnLimC} as={Input} />
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