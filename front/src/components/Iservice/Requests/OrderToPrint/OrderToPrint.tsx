import classNames from "classnames"
import { IUnit } from "../../../../types/types"
import s from "./OrderToPrint.module.scss"
import { cutText } from "../../../../utils/utils"
import { useState } from "react"
import settIcon from "../../../../assets/img/png/setting_icon.png"
import DeleteMessage from "../../../../common/messages/DeleteMessage/DeleteMessage"
import { deleteUnit } from "../../../../store/reducers/storeReducer/storeReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../store/store"
import { IOrder } from "../../../../store/reducers/RequestReducer/requestReducerTypes"
import { IOrderItemType } from "../NewPoForm/OrderItemForm/OrderItemForm"


type OrderPropsType = {
    order: IOrder
}

const OrderToPrint: React.FC<OrderPropsType> = ({ order }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);

    return (
        <div className={s.order} >
            <span className={classNames(s.order__title, s.order__number)} >{order.requestNumber}</span>
            <span className={classNames(s.order__title, s.order__number)} >{order.poNumber}</span>
            <span className={classNames(s.order__title, s.order__date)} >{order.poDate}</span>
            <div className={classNames(s.order__title, s.order__unit)} >{order.items.map((unit: IOrderItemType) => <div className={s.item}>
                <span className={s.item__pn}>{unit.pn}</span>
                <span className={s.item__desc}>{unit.desc}</span>
            </div>)
            }
            </div>
            <span className={classNames(s.order__title, s.order__supplier)} >{order.supplier}</span>
            <span className={classNames(s.order__title, s.order__price)} >{order.poPrice}</span>
            <span className={classNames(s.order__title, s.order__status)} >{order.status}</span>
        </div>
    )
}

export default OrderToPrint;