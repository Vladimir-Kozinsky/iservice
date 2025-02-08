import { IGear, IGearHistory } from "../../../../../types/types";
import s from "./GearHistorySection.module.scss";

type HistorySectionProps = {
    gear: IGear;
}


const GearHistory: React.FC<HistorySectionProps> = ({ gear }) => {
    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Inst/Rem History</h3>
            {!gear.gearHistory.length && <span className={s.section__message} >No removal / instolation actions</span>}

            <div className={s.action__title}>
                <div className={s.action__value} >Date</div>
                <div className={s.action__value} >Action</div>
                <div className={s.action__value} >Gear</div>
                <div className={s.action__value} >Gear TSN</div>
                <div className={s.action__value} >Gear CSN</div>
                <div className={s.action__value} >Aircraft</div>
                <div className={s.action__value} >Aircraft TSN</div>
                <div className={s.action__value} >Aircraft CSN</div>
                <div className={s.action__value} >Reason</div>
            </div>
            {gear.gearHistory.map((action: IGearHistory) => {
                return (
                    <div className={s.action}>
                        <div className={s.action__value} >{action.date}</div>
                        <div className={s.action__value} >{action.action}</div>
                        <div className={s.action__value} >{action.gear}</div>
                        <div className={s.action__value} >{action.gearTsn}</div>
                        <div className={s.action__value} >{action.gearCsn}</div>
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

export default GearHistory;