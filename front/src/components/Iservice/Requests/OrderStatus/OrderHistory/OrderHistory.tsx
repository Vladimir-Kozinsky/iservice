import s from './OrderHistory.module.scss'
import crosIcon from '../../../../../assets/img/png/cross-input.png'
import { IOrder, ISatus } from '../../../../../store/reducers/requestReducer/requestReducerTypes';

type HistoryOrderPropsType = {
    isHistoryOrder: (isOrder: boolean) => void;
    history: ISatus[]
}

const OrderHistory: React.FC<HistoryOrderPropsType> = ({ history, isHistoryOrder }) => {
    const items = () => history.map((historyItem: ISatus) => {
        return (
            <div className={s.unitHistory}>
                <span className={s.unitHistory__value}>{historyItem.date}</span>
                <span className={s.unitHistory__value}>{historyItem.status}</span>
                <span className={s.unitHistory__value}>{historyItem.user}</span>
                <span className={s.unitHistory__value}>{historyItem.remark}</span>
            </div>
        )
    })
    return (
        <div className={s.unitHistory__container} >
            <div className={s.unitHistory__wrapper}>
                <button className={s.unitHistory__btn} onClick={() => isHistoryOrder(false)} ><img src={crosIcon} alt="icon" /> </button>
                <div className={s.unitHistory}>
                    <span className={s.unitHistory__title}>Date</span>
                    <span className={s.unitHistory__title}>Status</span>
                    <span className={s.unitHistory__title}>Updated By:</span>
                    <span className={s.unitHistory__title}>Remarks</span>
                </div>
                {history.length ? items() : 'No data'}
            </div >
        </div >
    )
}

export default OrderHistory;