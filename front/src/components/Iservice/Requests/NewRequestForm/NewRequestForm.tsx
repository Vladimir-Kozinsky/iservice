import { useDispatch } from "react-redux";
import Button from "../../../../common/buttons/Button";
import s from "./NewRequestForm.module.scss"
import { AppDispatch } from "../../../../store/store";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import StoreInput from "../../../../common/inputs/StoreInput";
import { ICreateRequestDto } from "../../../../store/reducers/RequestReducer/requestReducerTypes";

type NewRequestFormPropsType = {
    isNewForm: (isNewWorm: boolean) => void;
}

const NewRequestForm: React.FC<NewRequestFormPropsType> = ({ isNewForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    return (
        <Formik
            initialValues={{
                requestNumber: '',
                date: '',
                priority: '',
              //  items: [],
                requestedBy: '',
            }}
            validate={values => {
                interface ICreateRequestErrorsDto {
                    requestNumber?: string;
                    date?: string;
                    priority?: string;
                    //items?: string;
                    requestedBy?: string;
                }
                const errors: ICreateRequestErrorsDto = {};
                if (!values.requestNumber) errors.requestNumber = 'Request No is required';
                if (!values.date) errors.date = 'Request date is required';
                //if (!values.items.length) errors.items = 'Item is required';
                if (!values.requestedBy) errors.requestedBy = 'Name is required';
                return errors;
            }}
            onSubmit={(values: ICreateRequestDto) => {
                (async () => {
                    setIsLoader(true);
                   // await dispatch(createTool(values));
                    setIsLoader(false);
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
            <Form className={s.newUnitForm__container}>
                <div className={s.newUnitForm__wrapper}>
                    <div className={s.newUnitForm}>
                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Create request</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Request No. <span>*</span></label>
                                    <Field type="text" id="requestNumber" name="requestNumber"
                                        placeholder="Request No" error={errors.requestNumber} as={StoreInput} />
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Date<span></span></label>
                                    <Field type="date" id="date" name="date"
                                        placeholder="" error={errors.date} as={StoreInput} />
                                </div>

                               

                                <div className={s.inputs__block}>
                                    <label>Priority<span>*</span></label>
                                    <Field  type="text" id="priority" name="priority"
                                        placeholder="Type" error={errors.priority} as="select">
                                        <option value="A">“A” AOG</option>
                                        <option value="B">“B” Critical</option>
                                        <option value="C">“C” ASAP</option>
                                        <option value="D">“D” Stock</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.newUnitForm__buttons} >
                        <Button text="Back" btnType="button" color="white" handler={() => isNewForm(false)} />
                        <Button text="Add" color="green" btnType="submit" />
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    )
}

export default NewRequestForm;