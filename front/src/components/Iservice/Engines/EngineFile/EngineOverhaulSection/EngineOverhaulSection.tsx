import React from "react";
import s from "./EngineOverhaulSection.module.scss";
import { IEngine } from "../../../../../types/types";

type EngineOverhaulSectionProps = {
    engine: IEngine;
}

const EngineOverhaulSection: React.FC<EngineOverhaulSectionProps> = ({ engine }) => {
    return (
        <>
            {engine.overhaulNum && <div className={s.section} >
                <h3 className={s.section__header}>Overhaul Info</h3>
                <div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>Overhauls:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{engine.overhaulNum}</span>
                        </div>
                    </div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>Overhaul Date:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{engine.lastOverhaulDate}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>TSN Overhaul:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{engine.tsnAtLastOverhaul}</span>
                        </div>
                    </div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>CSN Overhaul:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{engine.csnAtLastOverhaul}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default EngineOverhaulSection;