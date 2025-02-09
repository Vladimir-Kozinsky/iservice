import React from "react";
import s from "./GearInfoSection.module.scss";
import { IEngine, IGear } from "../../../../../types/types";

type GearInfoSectionProps = {
    gear: IGear;
}

const GearInfoSection: React.FC<GearInfoSectionProps> = ({ gear }) => {
    return (
        <div className={s.section} >
            <h3 className={s.section__header}>Gear Info</h3>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>PN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{gear.pn}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>SN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{gear.sn}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Position:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{gear.pos}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Manuf. date:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>None</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>TSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{gear.tsn}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>CSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{gear.csn}</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default GearInfoSection;