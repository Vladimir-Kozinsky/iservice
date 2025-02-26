import React from "react";
import s from "./EngineInstallSection.module.scss";
import { IEngine } from "../../../../../types/types";

type EngineInfoSectionProps = {
    engine: IEngine;
}

const EngineInstallSection: React.FC<EngineInfoSectionProps> = ({ engine }) => {
    const InstallData = engine.engineHistory[engine.engineHistory.length - 1];
    return (
        <div className={s.section} >
            <h3 className={s.section__header}>Engine Installation Info</h3>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Aircraft MSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{InstallData.aircraft}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Position:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{engine.position}</span>
                    </div>
                </div>
            </div>
            
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Aircraft TSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{InstallData.aircraftTsn}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Aircraft CSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{InstallData.aircraftCsn}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Engine TSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{InstallData.engineTsn}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Engine CSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{InstallData.engineCsn}</span>
                    </div>
                </div>
            </div>
            


        </div>
    )
}

export default EngineInstallSection;