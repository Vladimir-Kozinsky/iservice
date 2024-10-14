import React from "react";
import s from "./ApuOverhaulSection.module.scss";
import { IApu } from "../../../../../types/types";

type ApuOverhaulSectionProps = {
    apu: IApu;
}

const ApuOverhaulSection: React.FC<ApuOverhaulSectionProps> = ({ apu }) => {
    return (
        <>
            {apu.overhaulNum && <div className={s.section} >
                <h3 className={s.section__header}>Overhaul Info</h3>
                <div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>Overhauls:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{apu.overhaulNum}</span>
                        </div>
                    </div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>Overhaul Date:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{apu.lastOverhaulDate}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>TSN Overhaul:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{apu.tsnAtLastOverhaul}</span>
                        </div>
                    </div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>CSN Overhaul:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{apu.csnAtLastOverhaul}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ApuOverhaulSection;