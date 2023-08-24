import React from "react";
import s from "./EngineInfoSection.module.scss";
import { IEngine } from "../../../../../types/types";

type EngineInfoSectionProps = {
    engine: IEngine;
}

const EngineInfoSection: React.FC<EngineInfoSectionProps> = ({ engine }) => {
    return (
        <div className={s.section} >
            <h3 className={s.section__header}>Engine Info</h3>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Engine Type:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.type}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>MSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.msn}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Position:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.position}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Manuf. date:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.manufDate}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>TSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.tsn}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>CSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.csn}</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EngineInfoSection;