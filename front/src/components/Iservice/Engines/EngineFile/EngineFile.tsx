import React, { useRef } from "react";
import s from "./EingineFile.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { IEngine, IEngineHistory, ILimit } from "../../../../types/types";
import { subtractDatesFromNow, subtractFC, subtractFH } from "../../../../utils/utils";
import FileWidget from "../../../../common/FileWidget/FileWidget";
import ReactToPrint from "react-to-print";
import Button from "../../../../common/buttons/Button";
import printIcon from "../../../../assets/img/png/print-icon.png";
import timerIcon from "../../../../assets/img/jpeg/timer.jpg";
import timerDelIcon from "../../../../assets/img/jpeg/timerDel.jpg";
import { useNavigate } from "react-router-dom";

const EngineFile: React.FC = () => {
    const engine = useSelector((state: RootState) => state.engine.choosedEngine);
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);

    const limitSwitcher = (limit: ILimit, engine: IEngine) => {
        const dependence = limit.dependence as keyof typeof engine | string;
        switch (dependence) {
            case 'fh':
                return `${subtractFH(limit.threshold, engine.tsn)} FH`
            case 'fc':
                return `${subtractFC(limit.threshold, engine.csn)} FC`
            case 'date':
                return `${subtractDatesFromNow(limit.threshold)} Days`
            default:
                return "N/A";
        }
    }

    const limits = () => engine.limits.map((limit: ILimit, pos: number) => {
        return (
            <div key={pos} className={s.limit}>
                <div className={s.limit__header}>
                    <label>{limit.title}</label>
                </div>
                <div className={s.info__section__block} >
                    <div className={s.label__block}>
                        <label>Remain:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{`${limitSwitcher(limit, engine)}`}</span>
                    </div>
                </div>
                <div className={s.info__section__block} >
                    <div className={s.label__block}>
                        <label>Next:</label>
                    </div>
                    <div className={s.span__block} >
                        <span>{`${limit.threshold} ${limit.dependence !== "date"
                            ? limit.dependence.toUpperCase()
                            : ''}`}</span>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className={s.engineFile} >
            <h1 className={s.engineFile__header} >Engine File of {engine.msn}</h1>
            <div className={s.engineFile__container} >
                <div className={s.info__container}>
                    <div className={s.info}>
                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Engine Info</h3>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Engine Type:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.type}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>MSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.msn}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Position:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.position}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Manuf. date:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.manufDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>TSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.tsn}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>CSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.csn}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {engine.overhaulNum && <div className={s.info__section}>
                            <h3 className={s.section__header}>Overhaul Info</h3>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Overhauls:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.overhaulNum}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Overhaul Date:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.lastOverhaulDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>TSN Overhaul:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.tsnAtLastOverhaul}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>CSN Overhaul:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{engine.csnAtLastOverhaul}</span>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className={s.limits__section}>
                            <h3 className={s.section__header}>Limits</h3>
                            {!engine.limits.length && <span className={s.section__message} >No limits set</span>}
                            {limits()}
                        </div>


                        <div className={s.history__section}>
                            <h3 className={s.section__header}>Hystory</h3>
                            {!engine.engineHistory.length && <span className={s.section__message} >No removal / instolation actions</span>}
                            <div className={s.action}>
                                        <div className={s.action__value} >Date</div>
                                        <div className={s.action__value} >Action</div>
                                        <div className={s.action__value} >Engine</div>
                                        <div className={s.action__value} >Engine TSN</div>
                                        <div className={s.action__value} >Engine CSN</div>
                                        <div className={s.action__value} >Aircraft</div>
                                        <div className={s.action__value} >Aircraft TSN</div>
                                        <div className={s.action__value} >Aircraft CSN</div>
                                        <div className={s.action__value} >Reason</div>
                                    </div>
                            {engine.engineHistory.map((action: IEngineHistory) => {
                                return (
                                    <div className={s.action}>
                                        <div className={s.action__value} >{action.date}</div>
                                        <div className={s.action__value} >{action.action}</div>
                                        <div className={s.action__value} >{action.engine}</div>
                                        <div className={s.action__value} >{action.engineTsn}</div>
                                        <div className={s.action__value} >{action.engineCsn}</div>
                                        <div className={s.action__value} >{action.aircraft}</div>
                                        <div className={s.action__value} >{action.aircraftTsn}</div>
                                        <div className={s.action__value} >{action.aircraftCsn}</div>
                                        <div className={s.action__value} >{action.reason}</div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
                <div className={s.engineFile__container__buttons} >
                    <ReactToPrint
                        trigger={() => <button className={s.print__btn} >
                            <FileWidget text="Print report" img={printIcon} />
                        </button>}
                        content={() => componentRef.current}
                    />

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