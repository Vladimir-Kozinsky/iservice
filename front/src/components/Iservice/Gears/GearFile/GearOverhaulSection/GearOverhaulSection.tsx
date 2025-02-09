import React from "react";
import s from "./GearOverhaulSection.module.scss";
import { IEngine, IGear } from "../../../../../types/types";

type GearOverhaulSectionProps = {
    gear: IGear;
}

const GearOverhaulSection: React.FC<GearOverhaulSectionProps> = ({ gear }) => {
    return (
        <>
            {gear.lastInspDate && <div className={s.section} >
                <h3 className={s.section__header}>Overhaul Info</h3>
                <div>
                    {/* <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>Overhauls:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{gear.overhaulNum}</span>
                        </div>
                    </div> */}
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>Overhaul Date:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{gear.lastInspDate}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>TSN Overhaul:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{gear.tsnAtLastInsp}</span>
                        </div>
                    </div>
                    <div className={s.section__block} >
                        <div className={s.label__block}>
                            <label>CSN Overhaul:</label>
                        </div>
                        <div className={s.span__block} >
                            <span>{gear.csnAtLastInsp}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default GearOverhaulSection;