import React, { useRef } from "react";
import s from "./EingineFile.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { IEngine, IEngineHistory, ILimit } from "../../../../types/types";
import { subtractDatesFromNow, subtractFC, subtractFH } from "../../../../utils/utils";
import FileWidget from "../../../../common/FileWidget/FileWidget";
import Button from "../../../../common/buttons/Button";
import printIcon from "../../../../assets/img/png/print-icon.png";
import timerIcon from "../../../../assets/img/jpeg/timer.jpg";
import timerDelIcon from "../../../../assets/img/jpeg/timerDel.jpg";
import { useNavigate } from "react-router-dom";
import EngineInfoSection from "./EngineInfoSection/EngineInfoSection";
import EngineOverhaulSection from "./EngineOverhaulSection/EngineOverhaulSection";
import LimitSection from "../../../../common/LImitSection/LimitSection";
import EngineHistory from "./EngineHistory/EngineHistorySection";
import ReactToPrint from "react-to-print";


const EngineFile: React.FC = () => {
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const navigate = useNavigate();

    return (
        <div className={s.engineFile} >
            <h1 className={s.engineFile__header} >Engine File of {engine.msn}</h1>
            <div className={s.engineFile__container} >
                <div className={s.info__container}>
                    <div className={s.info}>
                        <EngineInfoSection engine={engine} />
                        <EngineOverhaulSection engine={engine} />
                        <LimitSection engine={engine} />
                        <EngineHistory engine={engine} />
                    </div>
                </div>
                <div className={s.engineFile__container__buttons} >
                    <FileWidget text="Print report" img={printIcon} handler={() => navigate('report')} />
                    <FileWidget text="new limit" img={timerIcon} handler={() => navigate('limit')} />
                    <FileWidget text="del limit" img={timerDelIcon} handler={() => navigate('limit/del')} />
                </div>
            </div>
            <div className={s.engineFile__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate('/i-service/engines')} />
            </div>
        </div>
    )
}

export default EngineFile;