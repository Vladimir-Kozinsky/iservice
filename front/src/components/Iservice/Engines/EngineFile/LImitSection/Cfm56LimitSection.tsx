import React from "react";
import s from "./Cfm56LimitSection.module.scss";
import { ICfm56EngineLimit, IEngine } from "../../../../../types/types";
import classNames from "classnames";

type LimitSectionProps = {
    engine: IEngine;
}

const Cfm56LimitSection: React.FC<LimitSectionProps> = ({ engine }) => {

    const discr__value = classNames(s.action__value, s.discr);
    const pn__value = classNames(s.action__value, s.pn);
    const sn__value = classNames(s.action__value, s.sn);

    const CalcRemA = (csnA: string, csnB: string, csnC: string, csnLimA: string, csnLimB: string, csnLimC: string) => {
        const b = +csnB / +csnLimB;
        const c = +csnC / +csnLimC;
        return Math.round((1 - b - c) * (+csnLimA) - (+csnA));
    }
    const CalcRemB = (csnA: string, csnB: string, csnC: string, csnLimA: string, csnLimB: string, csnLimC: string) => {
        const a = +csnA / +csnLimA;
        const c = +csnC / +csnLimC;
        return Math.round((1 - a - c) * (+csnLimB) - (+csnB));
    }
    const CalcRemC = (csnA: string, csnB: string, csnC: string, csnLimA: string, csnLimB: string, csnLimC: string) => {
        const a = +csnA / +csnLimA;
        const b = +csnB / +csnLimB;
        return Math.round((1 - a - b) * (+csnLimC) - (+csnC));
    }

    return (
        <div className={s.section}>
            <h3 className={s.section__header}>Live Limits Parts</h3>
            {!engine.limits.length && <span className={s.section__message} >No limits set</span>}
            <div className={s.action}>
                <div className={s.action__value} >IIN</div>
                <div className={discr__value} >DESCRIPTION</div>
                <div className={pn__value} >PART NUMBER</div>
                <div className={sn__value} >SERIAL NUMBER</div>
                <div className={s.action__value} >TT CY</div>
                <div className={s.action_block}>
                    <div className={s.action__block__title}>
                        TOTAL CYCLES CATEGORY
                    </div>
                    <div className={s.action__block__value}>
                        <div className={s.action__value} >A</div>
                        <div className={s.action__value} >B</div>
                        <div className={s.action__value} >C</div>
                    </div>
                </div>

                <div className={s.action_block}>
                    <div className={s.action__block__title}>
                        LIFE LIMIT CYCLES CATEGORY
                    </div>
                    <div className={s.action__block__value}>
                        <div className={s.action__value} >A</div>
                        <div className={s.action__value} >B</div>
                        <div className={s.action__value} >C</div>
                    </div>
                </div>

                <div className={s.action_block}>
                    <div className={s.action__block__title}>
                        REMAINING CYCLES CATEGORY
                    </div>
                    <div className={s.action__block__value}>
                        <div className={s.action__value} >A</div>
                        <div className={s.action__value} >B</div>
                        <div className={s.action__value} >C</div>
                    </div>
                </div>
            </div>
            {engine.limits.map((limit: ICfm56EngineLimit) => {
                return (
                    <div className={s.action}>
                        <div className={s.action__value} >{limit.section}</div>
                        <div className={discr__value} >{limit.part}</div>
                        <div className={pn__value} >{limit.pn}</div>
                        <div className={sn__value} >{limit.sn}</div>
                        <div className={s.action__value} >{+limit.csnA + (+limit.csnB) + (+limit.csnC)}</div>


                        <div className={s.action__value} >{limit.csnA}</div>
                        <div className={s.action__value} >{limit.csnB}</div>
                        <div className={s.action__value} >{limit.csnC}</div>


                        <div className={s.action__value} >{limit.csnLimA}</div>
                        <div className={s.action__value} >{limit.csnLimB}</div>
                        <div className={s.action__value} >{limit.csnLimC}</div>

                        <div className={s.action__value} >
                            {CalcRemA(limit.csnA, limit.csnB, limit.csnC, limit.csnLimA, limit.csnLimB, limit.csnLimC)}
                        </div>
                        <div className={s.action__value} >
                            {CalcRemB(limit.csnA, limit.csnB, limit.csnC, limit.csnLimA, limit.csnLimB, limit.csnLimC)}
                        </div>
                        <div className={s.action__value} >
                            {CalcRemC(limit.csnA, limit.csnB, limit.csnC, limit.csnLimA, limit.csnLimB, limit.csnLimC)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Cfm56LimitSection;