import classNames from "classnames";
import Button from "../../../../common/buttons/Button";
import { IOrder } from "../../../../store/reducers/requestReducer/RequestReducerTypes";
import menuIcon from "../../../../assets/img/svg/arrow-down.svg";
import s from "./OrderStatus.module.scss";
import { useState } from "react";
import { ItemType } from "../NewRequestForm/NewRequestForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { Field } from "formik";
import { IOrderItemType } from "../NewPoForm/OrderItemForm/OrderItemForm";
import { acceptOrder, approveOrder, cancelOrder } from "../../../../store/reducers/requestReducer/RequestReducer";
import UpdateStatusForm from "./UpdateStatusForm/UpdateStatusForm";
import settIcon from "../../../../assets/img/png/edit-icon.png";
import OrderHistory from "./OrderHistory/OrderHistory";
import { NavLink } from "react-router-dom";
import PrintPoForm from "../PrintPoForm/PrintPoForm";

type RequestPropsType = {
    order: IOrder;
}

const OrderStatus: React.FC<RequestPropsType> = ({ order }) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isMenu, setIsMenu] = useState<boolean>(false);
    const [isForm, setIsForm] = useState<boolean>(false);
    const [menu, setMenu] = useState(false);
    const [historyOrder, isHistoryOrder] = useState(false);
    const [printForm, setPrintForm] = useState(false);

    const onMouseLeave = () => {
        setMenu(false);
    }

    return (
        <div className={classNames(s.request, isMenu ? s.active : null)}>
            {historyOrder && <OrderHistory history={order.statusHistory} isHistoryOrder={isHistoryOrder} />}
            {isForm && <UpdateStatusForm isForm={setIsForm} order={order} />}
            {printForm && <PrintPoForm order={order} handler={setPrintForm} />}
            <button
                onClick={() => isMenu ? setIsMenu(false) : setIsMenu(true)}
                className={s.menu__btn}>
                <img className={s.menu__btn__img} src={menuIcon} alt="icon" />
            </button>
            <button className={s.setting__btn} onClick={() => setMenu(true)}>
                <img className={s.setting__btn__img} src={settIcon} alt="icon" />
            </button>
            <div onMouseLeave={onMouseLeave} className={classNames(s.unit__menu, menu ? s.unit__menu__active : '')}>
                <button
                    className={classNames(s.unit__menu__button, user.role === 'admin'
                        && !order.acceptedBy
                        ? null
                        : s.inactive)
                    }
                    onClick={() => dispatch(acceptOrder({
                        poNumber: order.poNumber,
                        acceptedBy: `${user.firstName} ${user.lastName}`
                    }))}
                    disabled={user.role === 'admin'
                        && !order.acceptedBy
                        ? false
                        : true} >
                    Accept
                </button>

                <button
                    className={classNames(s.unit__menu__button, user.role === 'admin'
                        && order.acceptedBy
                        && !order.approvedBy
                        ? null
                        : s.inactive)}
                    onClick={() => dispatch(approveOrder({
                        poNumber: order.poNumber,
                        approvedBy: `${user.firstName} ${user.lastName}`
                    }))}
                    disabled={user.role === 'admin'
                        && order.acceptedBy
                        && !order.approvedBy
                        ? false
                        : true} >
                    Approve
                </button>
                <button className={classNames(s.unit__menu__button, order.approvedBy ? null : s.inactive)}
                    onClick={() => setIsForm(true)} >Update Status</button>
                <button className={s.unit__menu__button} onClick={() => setPrintForm(true)} >Print PO</button>
                <button className={s.unit__menu__button}
                    onClick={() => isHistoryOrder(true)} >History</button>

                <button onClick={() => dispatch(cancelOrder({
                    poNumber: order.poNumber,
                    canceledBy: `${user.firstName} ${user.lastName}`
                }))} className={s.unit__menu__button} >Cancel PO</button>
            </div>
            <div className={s.request__container}>
                <div className={s.request__block}>
                    <div className={s.request__block__title}><span>PO No.:</span> </div>
                    <div className={s.request__block__value}><span>{order.poNumber}</span></div>
                </div>
                <div className={s.request__block}>
                    <div className={s.request__block__title}><span>Date:</span> </div>
                    <div className={s.request__block__value}><span>{order.poDate}</span></div>
                </div>
            </div>
            <div className={s.request__container}>
                <div className={s.request__block}>
                    <div className={s.request__block__title}><span>RFQ No.:</span> </div>
                    <div className={s.request__block__value}><span>{order.requestNumber}</span></div>
                </div>
                <div className={s.request__block}>
                    <div className={s.request__block__title}><span>Status:</span> </div>
                    <div className={classNames(s.request__block__value, s.request__status__value)}>
                        <span>{`${order.status}`.toUpperCase()}</span>
                    </div>
                </div>
            </div>



            <div className={classNames(s.menu, isMenu ? s.active : null)}>
                <div className={s.menu__item}>
                    <div className={s.request__status}>
                        <div className={s.request__block__title}><span>Remark:</span> </div>
                        <div className={s.request__status__value}>
                            {/* <span className={s.status__remark}> */}
                            <NavLink rel="stylesheet" to={order.statusHistory[order.statusHistory.length - 1].remark}>
                                {order.statusHistory[order.statusHistory.length - 1].remark}
                            </NavLink>

                            {/* </span> */}
                        </div>
                    </div>
                </div>
                <div className={classNames(s.item, s.item__title)}>
                    <div className={classNames(s.item__value, s.item__value__pn)}>P/N</div>
                    <div className={classNames(s.item__value, s.item__value__desc)}>Description</div>
                    <div className={classNames(s.item__value, s.item__value__quantity)}>Qty</div>
                    <div className={classNames(s.item__value, s.item__value__oum)}>UOM</div>
                    <div className={classNames(s.item__value, s.item__value__price)}>Unit Price</div>
                    <div className={classNames(s.item__value, s.item__value__tprice)}>Total Price</div>
                </div>
                {order.items.map((item: IOrderItemType, index: number) => {
                    return (
                        <div className={s.item}>
                            <div title={item.pn} className={classNames(s.item__value, s.item__value__pn)}>{item.pn}</div>
                            <div title={item.desc} className={classNames(s.item__value, s.item__value__desc)}>{item.desc}</div>
                            <div className={classNames(s.item__value, s.item__value__quantity)}>{item.quantity}</div>
                            <div className={classNames(s.item__value, s.item__value__oum)}>{item.uom}</div>
                            <div className={classNames(s.item__value, s.item__value__price)}>{item.price}</div>
                            <div className={classNames(s.item__value, s.item__value__tprice)}>{item.totalprice}</div>

                        </div>
                    )
                })}
                <div className={s.order__price}>
                    <span>Total:</span>
                    <span>{order.poPrice}</span>
                </div>
            </div>


        </div>
    )
}

export default OrderStatus;
