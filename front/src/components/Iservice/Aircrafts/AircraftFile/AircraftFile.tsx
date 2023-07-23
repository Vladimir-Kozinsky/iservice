import s from "./AircraftFile.module.scss";
import Button from "../../../../common/buttons/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { sortEngines } from "../../../../utils/utils";
import { IEngine } from "../../../../types/types";


const AircraftFile = () => {
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);

    const engines = () => sortEngines(aircraft.engines).map((engine: IEngine) => (
        <div className={s.info__section__block} >
            <div className={s.label__block}>
                <label>{`ENG #${engine.engineHistory.length ?
                    engine.engineHistory[engine.engineHistory.length - 1].position
                    : "N/A"}`}</label>
            </div>
            <div className={s.span__block} >
                <span>{engine.msn}</span>
            </div>
        </div>
    ))

    return (
        <div className={s.aircraftFile} >
            <h1 className={s.aircraftFile__header} >Aircraft File of {aircraft.msn}</h1>
            <div className={s.aircraftFile__container} >
                <div className={s.info__container}>
                    <div className={s.info}>
                        <div className={s.info__section}>
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

                        <div className={s.info__section}>

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

                        </div>
                        <div className={s.info__section}>
                            {engines()}
                        </div>

                    </div>
                    <div id='widget__container' className={s.widget__container} >
                        widgets
                    </div>
                </div>
                <div className={s.aircraftFile__container__buttons} >
                    <Button text="Print Report" btnType="button" color="green" handler={() => console.log('print form')} />
                </div>
            </div>
            <div className={s.aircraftFile__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => console.log('back to aircafts')} />
            </div>
        </div >
    )
}

export default AircraftFile;