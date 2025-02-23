import React from "react";
import { IApu, IEngine, IGear, ILimit } from "../../types/types";
import s from "./LimitSection.module.scss";
import { subtractDatesFromNow, subtractFC, subtractFH } from "../../utils/utils";

type LimitSectionProps = {
    engine: IEngine;
}

const LimitSection: React.FC<LimitSectionProps> = ({ engine }) => {


    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Live Limits Parts</h3>
            {!engine.limits.length && <span className={s.section__message} >No limits set</span>}
            <div className={s.action__title}>
                <div className={s.action__value} >IIN</div>
                <div className={s.action__value} >DESCRIPTION</div>
                <div className={s.action__value} >PART NUMBER</div>
                <div className={s.action__value} >SERIAL NUMBER</div>
                <div className={s.action__value} >TOTAL CYCLES</div>
                <div className={s.action__value} >Aircraft</div>
                <div className={s.action__value} >Aircraft TSN</div>
                <div className={s.action__value} >Aircraft CSN</div>
                <div className={s.action__value} >Reason</div>
            </div>
        </div>
    )
}

export default LimitSection;