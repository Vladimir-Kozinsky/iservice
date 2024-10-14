import React from "react";
import s from "./ApuInfoSection.module.scss";
import { IApu, IEngine } from "../../../../../types/types";

type ApuInfoSectionProps = {
    apu: IApu;
}

const ApuInfoSection: React.FC<ApuInfoSectionProps> = ({ apu }) => {
    return (
        <div className={s.section} >
            <h3 className={s.section__header}>APU Info</h3>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>APU Type:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{apu.type}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>MSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{apu.msn}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>Manuf. date:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{apu.manufDate}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>TSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{apu.tsn}</span>
                    </div>
                </div>
                <div className={s.section__block} >
                    <div className={s.label__block}>
                        <label>CSN:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{apu.csn}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApuInfoSection;