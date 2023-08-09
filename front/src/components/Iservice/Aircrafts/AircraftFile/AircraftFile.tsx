import s from "./AircraftFile.module.scss";
import Button from "../../../../common/buttons/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { sortEngines, subtractDatesFromNow, subtractFC, subtractFH } from "../../../../utils/utils";
import { IAircraft, IEngine, ILimit } from "../../../../types/types";
import AircraftFileWidget from "./AircraftFileWidget/AircraftFileWidget";
import engineIcon from "../../../../assets/img/jpeg/engine-removal.jpg";
import legsIcon from "../../../../assets/img/png/legs-icon.png";
import printIcon from "../../../../assets/img/png/print-icon.png";
import timerIcon from "../../../../assets/img/jpeg/timer.jpg";
import timerDelIcon from "../../../../assets/img/jpeg/timerDel.jpg";
import { useNavigate } from "react-router-dom";


const AircraftFile = () => {
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const apu = aircraft.apu;
    const navigate = useNavigate();

    const engines = () => sortEngines(aircraft.engines).map((engine: IEngine) => (
        <div key={engine.msn} className={s.engine}>
            <div className={s.engine__header}>
                <label>{`ENG #${engine.position}`}</label>
            </div>
            <div className={s.info__section__block} >
                <div className={s.label__block}>
                    <label>MSN:</label>
                </div>
                <div className={s.span__block} >
                    <span>{engine.msn}</span>
                </div>
            </div>
            <div className={s.info__section__block} >
                <div className={s.label__block}>
                    <label>Manuf. Date:</label>
                </div>
                <div className={s.span__block} >
                    <span>{engine.manufDate}</span>
                </div>
            </div>
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
            <div className={s.info__section__block} >
                <div className={s.label__block}>
                    <label>Overhaul Date:</label>
                </div>
                <div className={s.span__block} >
                    <span>{engine.lastOverhaulDate}</span>
                </div>
            </div>
            <div className={s.info__section__block} >
                <div className={s.label__block}>
                    <label>TSLSV:</label>
                </div>
                <div className={s.span__block} >
                    <span>{subtractFH(engine.tsn, engine.tsnAtLastOverhaul)}</span>
                </div>
            </div>
            <div className={s.info__section__block} >
                <div className={s.label__block}>
                    <label>CSLSV:</label>
                </div>
                <div className={s.span__block} >
                    <span>{subtractFC(engine.csn, engine.csnAtLastOverhaul)}</span>
                </div>
            </div>
        </div>

    ))

    const limitSwitcher = (limit: ILimit, aircraft: IAircraft) => {
        const dependence = limit.dependence as keyof typeof aircraft | string;
        switch (dependence) {
            case 'fh':
                return `${subtractFH(limit.threshold, aircraft[dependence])} FH`
            case 'fc':
                return `${subtractFC(limit.threshold, aircraft[dependence])} FC`
            case 'date':
                return `${subtractDatesFromNow(limit.threshold)} Days`
            default:
                return "N/A";
        }
    }


    const limits = () => aircraft.limits.map((limit: ILimit, pos: number) => {

        return (
            <div className={s.limit} >
                <span>{`${pos + 1}.`}</span>
                <div className={s.limit__title}>
                    <label>{limit.title}:</label>
                </div>
                <div className={s.limit__value} >
                    <span>{limitSwitcher(limit, aircraft)}</span>
                </div>
            </div>
        )
    }

    )

    return (
        <div className={s.aircraftFile} >
            <h1 className={s.aircraftFile__header} >Aircraft File of {aircraft.msn}</h1>
            <div className={s.aircraftFile__container} >
                <div className={s.info__container}>
                    <div className={s.info}>
                        <div className={s.info__section}>
                            <h3 className={s.section__header}>Aircraft Info</h3>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Aircraft Type:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.type}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>MSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.msn}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Reg. number:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.regNum}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Manuf. date:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.manufDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Flight Hours:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.fh}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Flight Cycles:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.fc}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {aircraft.overhaulNum && <div className={s.info__section}>
                            <h3 className={s.section__header}>Overhaul Info</h3>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Overhauls:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.overhaulNum}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Overhaul Date:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.lastOverhaulDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>TSN Overhaul:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.tsnAtLastOverhaul}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>CSN Overhaul:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.csnAtLastOverhaul}</span>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className={s.engines__section}>
                            <h3 className={s.section__header}>Engines</h3>
                            {!aircraft.engines.length && <span className={s.section__message} >No engines installed</span>}
                            {engines()}
                            <div key={apu.msn} className={s.engine}>
                                <div className={s.engine__header}>
                                    <label>{`APU`}</label>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>MSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{apu.msn}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Manuf. Date:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{apu.manufDate}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>TSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{apu.tsn}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>CSN:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{apu.csn}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Overhaul Date:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{apu.lastOverhaulDate}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>TSLSV:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{subtractFH(apu.tsn, apu.tsnAtLastOverhaul)}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>CSLSV:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{subtractFC(apu.csn, apu.csnAtLastOverhaul)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.limits__section}>
                            <h3 className={s.section__header}>Limits</h3>
                            {!aircraft.limits.length && <span className={s.section__message} >No limits set</span>}
                            {limits()}
                        </div>


                    </div>

                </div>
                <div className={s.aircraftFile__container__buttons} >
                    <AircraftFileWidget text="Legs" img={legsIcon} handler={() => navigate(`legs`)} />
                    <AircraftFileWidget text="Print report" img={printIcon} handler={() => navigate('report')} />
                    <AircraftFileWidget text="Install Engine" img={engineIcon} handler={() => navigate('engine/install')} />
                    <AircraftFileWidget text="Remove Engine" img={engineIcon} handler={() => navigate('engine/remove')} />
                    <AircraftFileWidget text="new limit" img={timerIcon} handler={() => navigate('limit')} />
                    <AircraftFileWidget text="del limit" img={timerDelIcon} handler={() => navigate('limit/del')} />
                </div>
            </div>
            <div className={s.aircraftFile__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate('/i-service/aircrafts')} />
            </div>
        </div >
    )
}

export default AircraftFile;