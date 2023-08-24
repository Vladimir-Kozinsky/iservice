import { IEngine, IEngineHistory } from "../../../../../types/types";
import s from "./EngineHistorySection.module.scss";

type LimitSectionProps = {
    engine: IEngine;
}


const EngineHistory: React.FC<LimitSectionProps> = ({ engine }) => {
    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Inst/Rem History</h3>
            {!engine.engineHistory.length && <span className={s.section__message} >No removal / instolation actions</span>}

            <div className={s.action__title}>
                <div className={s.action__value} >Date</div>
                <div className={s.action__value} >Action</div>
                <div className={s.action__value} >Engine</div>
                <div className={s.action__value} >Engine TSN</div>
                <div className={s.action__value} >Engine CSN</div>
                <div className={s.action__value} >Aircraft</div>
                <div className={s.action__value} >Aircraft TSN</div>
                <div className={s.action__value} >Aircraft CSN</div>
                <div className={s.action__value} >Reason</div>
            </div>
            {engine.engineHistory.map((action: IEngineHistory) => {
                return (
                    <div className={s.action}>
                        <div className={s.action__value} >{action.date}</div>
                        <div className={s.action__value} >{action.action}</div>
                        <div className={s.action__value} >{action.engine}</div>
                        <div className={s.action__value} >{action.engineTsn}</div>
                        <div className={s.action__value} >{action.engineCsn}</div>
                        <div className={s.action__value} >{action.aircraft}</div>
                        <div className={s.action__value} >{action.aircraftTsn}</div>
                        <div className={s.action__value} >{action.aircraftCsn}</div>
                        <div className={s.action__value} >{action.reason}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default EngineHistory;