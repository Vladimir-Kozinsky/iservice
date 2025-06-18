import classNames from "classnames";
import Button from "../../../../common/buttons/Button";
import menuIcon from "../../../../assets/img/svg/arrow-down.svg";
import s from "./RequestStatus.module.scss"
import { useState } from "react";
import { ItemType } from "../NewRequestForm/NewRequestForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { approveRequest, cancelRequest } from "../../../../store/reducers/requestReducer/RequestReducer";
import { Field, Form, Formik } from "formik";
import NewPoForm from "../NewPoForm/NewPoForm";
import settIcon from "../../../../assets/img/png/edit-icon.png";
import OrderHistory from "../OrderStatus/OrderHistory/OrderHistory";
import { IRequest } from "../../../../store/reducers/requestReducer/RequestReducerTypes";

type RequestPropsType = {
    request: IRequest;
}

const RequestStatus: React.FC<RequestPropsType> = ({ request }) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isMenu, setIsMenu] = useState<boolean>(false);
    const [parts, setParts] = useState<string[]>([]);
    const [poForm, setPoForm] = useState<boolean>(false);
    const [menu, setMenu] = useState(false);
    const [historyOrder, isHistoryOrder] = useState(false);

    const onMouseLeave = () => {
        setMenu(false);
    }

    return (
        <Formik
            initialValues={{}}
            validate={values => {
                interface ICreateRequestErrorsDto {
                    requestNumber?: string;
                    date?: string;
                    priority?: string;
                    requestedBy?: string;
                }
                const errors: ICreateRequestErrorsDto = {};

                return errors;
            }}
            onSubmit={(values: any) => {
                (async () => {
                    const items = []
                    for (var a in values) {
                        console.log(a)
                        if (values[a]) items.push(a)
                    }
                    await setParts(items);
                    await setPoForm(true);

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
            <Form onMouseLeave={() => {
                setTimeout(() => {
                    setIsMenu(false)
                }, 500);

            }}>
                <div className={classNames(s.request)}>
                    {poForm && <NewPoForm handler={setPoForm} parts={parts} request={request} />}
                    {historyOrder && <OrderHistory history={request.statusHistory} isHistoryOrder={isHistoryOrder} />}
                    <button
                        onClick={() => isMenu ? setIsMenu(false) : setIsMenu(true)}
                        className={s.menu__btn}
                        type="button">
                        <img className={s.menu__btn__img} src={menuIcon} alt="icon" />
                    </button>
                    <button className={s.setting__btn} onClick={() => setMenu(true)} type="button">
                        <img className={s.setting__btn__img} src={settIcon} alt="icon" />
                    </button>
                    <div onMouseLeave={onMouseLeave} className={classNames(s.unit__menu, menu ? s.unit__menu__active : '')}>
                        <button className={
                            classNames(s.unit__menu__button, user.role === 'admin' && (request.status !== 'approved') ? null : s.inactive)}
                            onClick={() => dispatch(approveRequest({
                                requestNumber: request.requestNumber,
                                approvedBy: `${user.firstName} ${user.lastName}`
                            }))}
                            disabled={user.role === 'admin' && (request.status !== 'approved')
                                ? false
                                : true}
                            type="button">Approve</button>

                        <button className={
                            classNames(s.unit__menu__button, request.status === 'approved' ? null : s.inactive)}
                            type="submit"
                            disabled={request.status === 'approved'
                                ? false
                                : true}
                        >Create PO
                        </button>

                        <button className={s.unit__menu__button}
                            onClick={() => isHistoryOrder(true)}
                            type="button">History</button>

                        <button
                            className={
                                classNames(s.unit__menu__button)}
                            disabled={request.status !== 'cancelled'
                                ? false
                                : true}
                            onClick={() => dispatch(cancelRequest({
                                requestNumber: request.requestNumber,
                                canceledBy: `${user.firstName} ${user.lastName}`
                            }))}
                            type="button">Cancel RFQ</button>
                    </div>
                    <div className={s.request__container}>
                        <div className={s.request__block}>
                            <div className={s.request__block__title}><span>RFQ No.:</span> </div>
                            <div className={s.request__block__value}><span>{request.requestNumber}</span></div>
                        </div>
                        <div className={s.request__block}>
                            <div className={s.request__block__title}><span>Date:</span> </div>
                            <div className={s.request__block__value}><span>{request.date}</span></div>
                        </div>
                    </div>
                    <div className={s.request__container}>
                        <div className={s.request__block}>
                            <div className={s.request__block__title}><span>Status:</span> </div>
                            <div className={s.request__block__value}> <span>{`${request.status}`.toUpperCase()}</span></div>
                        </div>
                        <div className={s.request__block}>
                            <div className={s.request__block__title}><span>Updated:</span> </div>
                            <div className={s.request__block__value}><span>{request.statusHistory[request.statusHistory.length - 1].date}</span></div>
                        </div>
                    </div>



                    <div className={classNames(s.menu, isMenu ? s.active : null)} >
                        <div className={classNames(s.item, s.item__title)}>
                            <div className={classNames(s.item__value__checkbox)}></div>
                            <div className={classNames(s.item__value, s.item__value__no)}>No</div>
                            <div className={classNames(s.item__value, s.item__value__pn)}>P/N</div>
                            <div className={classNames(s.item__value, s.item__value__desc)}>Description</div>
                            <div className={classNames(s.item__value, s.item__value__ref)}>IPC Ref.</div>
                            <div className={classNames(s.item__value, s.item__value__quantity)}>Qty</div>
                        </div>
                        {request.items.map((item: ItemType, index: number) => {
                            return (
                                <div title={`PO No. ${item.poRef}`} className={s.item}>
                                    <Field disabled={item.poRef === 'no' ? false : true} className={classNames(s.item__value__checkbox)} type="checkbox" id={item.pn} name={item.pn} />
                                    <div className={classNames(s.item__value, s.item__value__no)}> {index + 1}</div>
                                    <div className={classNames(s.item__value, s.item__value__pn)}>{item.pn}</div>
                                    <div className={classNames(s.item__value, s.item__value__desc)}>{item.desc}</div>
                                    <div className={classNames(s.item__value, s.item__value__ref)}>{item.ref}</div>
                                    <div className={classNames(s.item__value, s.item__value__quantity)}>{item.quantity}</div>
                                </div>
                            )
                        })}
                        <div className={s.menu__buttons}>
                            {request.status === 'approved' && <Button width="80px" height="30px" fontSize="12px"
                                text={'Create PO'} color={"green"} btnType={"submit"}
                            />}

                        </div>
                    </div>


                </div>

            </Form>
        )}
        </Formik>
    )
}

export default RequestStatus;
