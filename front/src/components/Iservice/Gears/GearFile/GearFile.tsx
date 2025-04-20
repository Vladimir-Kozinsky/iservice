import React, { useRef } from "react";
import s from "./GearFile.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import FileWidget from "../../../../common/FileWidget/FileWidget";
import Button from "../../../../common/buttons/Button";
import printIcon from "../../../../assets/img/png/print-icon.png";
import timerIcon from "../../../../assets/img/jpeg/timer.jpg";
import timerDelIcon from "../../../../assets/img/jpeg/timerDel.jpg";
import { useNavigate } from "react-router-dom";
import GearInfoSection from "./GearInfoSection/GearInfoSection";
import GearOverhaulSection from "./GearOverhaulSection/GearOverhaulSection";
import GearHistory from "./GearHistory/GearHistorySection";
import GearLimitSection from "./LImitSection/GearLimitSection";

const GearFile: React.FC = () => {
    const gear = useSelector((state: RootState) => state.gear.choosedGear);
    const navigate = useNavigate();

    return (
        <div className={s.gearFile} >
            <h1 className={s.gearFile__header} >Gear File of S/N {gear.sn}</h1>
            <div className={s.gearFile__container} >
                <div className={s.info__container}>
                    <div className={s.info}>
                        <GearInfoSection gear={gear} />
                        <GearOverhaulSection gear={gear} />
                        <GearLimitSection gear={gear} />
                        <GearHistory gear={gear} />
                    </div>
                </div>
                <div className={s.gearFile__container__buttons} >
                    <FileWidget text="Print report" img={printIcon} handler={() => navigate('report')} />
                    <FileWidget text="new limit" img={timerIcon} handler={() => navigate('limit')} />
                    <FileWidget text="del limit" img={timerDelIcon} handler={() => navigate('limit/del')} />
                </div>
            </div>
            <div className={s.gearFile__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate('/i-service/gears')} />
            </div>
        </div>
    )
}

export default GearFile;