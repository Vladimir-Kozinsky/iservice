import { useDispatch, useSelector } from "react-redux";
import s from "./UpdateStatusForm.module.scss"
import { AppDispatch, RootState } from "../../../../../store/store";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import Select from "../../../../../common/inputs/Select/Select";
import Button from "../../../../../common/buttons/Button";
import { IOrder, IUpdateOrderStatusDto } from "../../../../../store/reducers/requestReducer/RequestReducerTypes";
import StoreTextArea from "../../../../../common/inputs/StoreTextArea";
import { updateOrderStatus } from "../../../../../store/reducers/requestReducer/RequestReducer";

interface IUpdateStatusErrorsDto {
    status?: string;
    remark?: string;
    user?: string;
    poNumber?: string;
}


type NewRequestFormPropsType = {
    isForm: (isNewWorm: boolean) => void;
    order: IOrder;
}


const UpdateStatusForm: React.FC<NewRequestFormPropsType> = ({ isForm, order }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);

    return (
        <Formik
            initialValues={{
                poNumber: order.poNumber,
                status: '',
                remark: '',
                user: '',
            }}
            validate={values => {
                const errors: IUpdateStatusErrorsDto = {

                };

                return errors;
            }}
            onSubmit={(values: IUpdateOrderStatusDto) => {
                (async () => {
                    setIsLoader(true);
                    values.poNumber = order.poNumber;
                    values.user = `${user.firstName} ${user.lastName}`;
                    await dispatch(updateOrderStatus(values));
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
            <Form className={s.updateStatusForm__container}>
                <div className={s.updateStatusForm__wrapper}>
                    <div className={s.updateStatusForm}>
                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Update PO status</h3>
                            <div className={s.inputs}>
                                <div className={s.inputs__block}>
                                    <label>Status<span>*</span></label>
                                    <Field type="text" id="status" name="status"
                                        placeholder="Remarks" error={errors.status} as={Select} >
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="recieved">Recieved</option>
                                        <option value="closed">Closed</option>
                                    </Field>
                                </div>

                                <div className={s.inputs__block}>
                                    <label>Remarks<span>*</span></label>
                                    <Field style={{ width: '400px' }}
                                        placeholder={'Remarks'} name="remark" id="remark" error={errors.remark} as={StoreTextArea} />

                                </div>



                            </div>

                        </div>
                    </div>
                    <div className={s.updateStatusForm__buttons} >
                        <Button text="Back" btnType="button" color="white" handler={() => isForm(false)} />
                        <Button text="Update" color="green" btnType="submit" />
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    )
}

export default UpdateStatusForm;

