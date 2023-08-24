import { useSelector } from "react-redux";
import s from "./PrintEngineReport.module.scss";
import { RootState } from "../../../../../store/store";
import { useState } from 'react';
import Button from "../../../../../common/buttons/Button";
import { useNavigate } from "react-router-dom";
import EngineInfoSection from "../EngineInfoSection/EngineInfoSection";
import EngineOverhaulSection from "../EngineOverhaulSection/EngineOverhaulSection";
import LimitSection from "../../../../../common/LImitSection/LimitSection";
import { getCurrentDate } from "../../../../../utils/utils";
import EngineHistory from "../EngineHistory/EngineHistorySection";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const PrintEngineReport = () => {
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const [engineInfo, setEngineInfo] = useState(false);
    const [overhaulInfo, setOverhaulInfo] = useState(false);
    const [history, setHistory] = useState(false);
    const [limits, setLimits] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    return (
        <div className={s.report} >
            <h1 className={s.report__header} >Engine Report</h1>
            <div className={s.report_setting} >
                <h3 className={s.report_setting__header}>Report setting</h3>
                <div className={s.report_setting__block} >
                    <input type="checkbox" onClick={() => setEngineInfo(!engineInfo)} checked={engineInfo} />
                    <label  >Engine Info</label>
                </div>

                <div className={s.report_setting__block} >
                    <input type="checkbox" onClick={() => setOverhaulInfo(!overhaulInfo)} />
                    <label  >Overhaul Info</label>
                </div>

                <div className={s.report_setting__block} >
                    <input type="checkbox" onClick={() => setHistory(!history)} />
                    <label  >History</label>
                </div>

                <div className={s.report_setting__block} >
                    <input type="checkbox" onClick={() => setLimits(!limits)} />
                    <label  >Limits</label>
                </div>

            </div>

            <div ref={componentRef} className={s.report__container} >
                <div className={s.aircraftInfo}>
                    <div className={s.aircraftInfo__wrap} >

                    </div>
                    <div className={s.aircraftInfo__wrap} >
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>Date:</span>
                            <span className={s.aircraftInfo__block__value}>{getCurrentDate()}</span>
                        </div>
                    </div>
                </div>


                {engineInfo && <EngineInfoSection engine={engine} />}
                {overhaulInfo && <EngineOverhaulSection engine={engine} />}
                {history && <EngineHistory engine={engine} />}
                {limits && <LimitSection engine={engine} />}

            </div>

            <div className={s.report__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate(`/i-service/engine/${engine.msn}`)} />
                <Button text="Print" btnType="button" color="green" handler={handlePrint} />
            </div>
        </div>
    )
}

export default PrintEngineReport;