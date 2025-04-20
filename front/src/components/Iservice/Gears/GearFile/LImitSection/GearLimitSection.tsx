import React from "react";
import s from "./GearLimitSection.module.scss";
import { IGear, IGearLimit } from "../../../../../types/types";
import classNames from "classnames";
import { subtractFC } from "../../../../../utils/utils";

type LimitSectionProps = {
    gear: IGear;
}

const GearLimitSection: React.FC<LimitSectionProps> = ({ gear }) => {

    const discr__value = classNames(s.action__value, s.discr);
    const pn__value = classNames(s.action__value, s.pn);
    const sn__value = classNames(s.action__value, s.sn);

    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Live Limits Parts</h3>
            {!gear.limits.length && <span className={s.section__message} >No limits set</span>}
            {gear.limits.length ? <div className={s.action}>
                <div className={s.action__value} >ITEM</div>
                <div className={discr__value} >DESCRIPTION</div>
                <div className={pn__value} >PART NUMBER</div>
                <div className={sn__value} >SERIAL NUMBER</div>
                <div className={sn__value} >INST. DATE</div>
                <div className={s.action__value} >FH LIMIT</div>
                <div className={s.action__value} >CY LIMIT</div>
                <div className={s.action__value} >CY AT INST.</div>
                <div className={s.action__value} >TSN</div>
                <div className={s.action__value} >CSN</div>
                <div className={s.action__value} >REMAIN CY</div>
            </div> : null}
            {gear.limits.map((limit: IGearLimit) => {
                return (
                    <div className={s.action}>
                        <div className={s.action__value} >{limit.item}</div>
                        <div className={discr__value} >{limit.part}</div>
                        <div className={pn__value} >{limit.pn}</div>
                        <div className={sn__value} >{limit.sn}</div>
                        <div className={sn__value} >{limit.instDate}</div>
                        <div className={s.action__value} >{limit.tsnLim}</div>
                        <div className={s.action__value} >{limit.csnLim}</div>
                        <div className={s.action__value} >{limit.instCsn}</div>
                        <div className={s.action__value} >{limit.tsn}</div>
                        <div className={s.action__value} >{limit.csn}</div>
                        <div className={s.action__value} >
                            {subtractFC(limit.csnLim, limit.csn)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default GearLimitSection;