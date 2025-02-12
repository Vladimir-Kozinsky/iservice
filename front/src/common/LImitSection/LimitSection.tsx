import React from "react";
import { IApu, IEngine, IGear, ILimit } from "../../types/types";
import s from "./LimitSection.module.scss";
import { subtractDatesFromNow, subtractFC, subtractFH } from "../../utils/utils";

type LimitSectionProps = {
    engine: IEngine | IApu;
}

const LimitSection: React.FC<LimitSectionProps> = ({ engine }) => {

    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Live Limits Parts</h3>
            {!engine.limits.length && <span className={s.section__message} >No limits set</span>}
            {/* {limits()} */}
        </div>
    )
}

export default LimitSection;