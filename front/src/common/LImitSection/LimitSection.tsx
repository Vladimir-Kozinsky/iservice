import React from "react";
import { IApu, IEngine, ILimit } from "../../types/types";
import s from "./LimitSection.module.scss";
import { subtractDatesFromNow, subtractFC, subtractFH } from "../../utils/utils";

type LimitSectionProps = {
    engine: IEngine | IApu;
}

const LimitSection:React.FC<LimitSectionProps> = ({engine}) => {


    // const limitSwitcher = (limit: ILimit, engine: IEngine | IApu) => {
    //     const dependence = limit.dependence as keyof typeof engine | string;
    //     switch (dependence) {
    //         case 'fh':
    //             return `${subtractFH(limit.threshold, engine.tsn)} FH`
    //         case 'fc':
    //             return `${subtractFC(limit.threshold, engine.csn)} FC`
    //         case 'date':
    //             return `${subtractDatesFromNow(limit.threshold)} Days`
    //         default:
    //             return "N/A";
    //     }
    // }

    // const limits = () => engine.limits.map((limit: ILimit, pos: number) => {
    //     return (
    //         <div key={pos} className={s.limit}>
    //             <div className={s.limit__header}>
    //                 <label>{limit.title}</label>
    //             </div>
    //             <div className={s.section__block} >
    //                 <div className={s.label__block}>
    //                     <label>Remain:</label>
    //                 </div>
    //                 <div className={s.span__block} >
    //                     <span>{`${limitSwitcher(limit, engine)}`}</span>
    //                 </div>
    //             </div>
    //             <div className={s.section__block} >
    //                 <div className={s.label__block}>
    //                     <label>Next:</label>
    //                 </div>
    //                 <div className={s.span__block} >
    //                     <span>{`${limit.threshold} ${limit.dependence !== "date"
    //                         ? limit.dependence.toUpperCase()
    //                         : ''}`}</span>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Limits</h3>
            {!engine.limits.length && <span className={s.section__message} >No limits set</span>}
            {/* {limits()} */}
        </div>
    )
}

export default LimitSection;