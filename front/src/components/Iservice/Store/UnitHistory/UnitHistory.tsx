import { IHistoryUnit, IUnit } from '../../../../types/types';
import s from './UnitHistory.module.scss'
import crosIcon from '../../../../assets/img/png/cross-input.png'

type HistoryUnitPropsType = {
    isHistoryUnit: (unit: null | IUnit) => void;
    unit: IUnit
}

const UnitHistory: React.FC<HistoryUnitPropsType> = ({ unit, isHistoryUnit }) => {
    const items = () => unit.usage.map((historyItem: IHistoryUnit) => {
        return (
            <div className={s.unitHistory}>
                <span className={s.unitHistory__value}>{historyItem.date}</span>
                <span className={s.unitHistory__value}>{historyItem.aircraft}</span>
                <span className={s.unitHistory__value}>{historyItem.wo}</span>
                <span className={s.unitHistory__value}>{historyItem.quantity}</span>
                <span className={s.unitHistory__value}>{historyItem.remark}</span>
            </div>
        )
    })
    return (
        <div className={s.unitHistory__container} >
            <div className={s.unitHistory__wrapper}>
                <button className={s.unitHistory__btn} onClick={() => isHistoryUnit(null)} ><img src={crosIcon} alt="icon" /> </button>
                <div className={s.unitHistory}>
                    <span className={s.unitHistory__title}>Date</span>
                    <span className={s.unitHistory__title}>Aircraft</span>
                    <span className={s.unitHistory__title}>Work Order</span>
                    <span className={s.unitHistory__title}>Qty.</span>
                    <span className={s.unitHistory__title}>Note</span>
                </div>
                {unit.usage.length ? items() : 'No data'}
            </div >
        </div >
    )
}

export default UnitHistory;