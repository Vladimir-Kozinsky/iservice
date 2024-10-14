import s from "./AircraftFile.module.scss";
import Button from "../../../../common/buttons/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { kgToLbs, lbTokg, ltTogal, sortEngines, subtractDatesFromNow, subtractFC, subtractFH } from "../../../../utils/utils";
import { IAircraft, IEngine, ILg, ILimit } from "../../../../types/types";
import engineIcon from "../../../../assets/img/jpeg/engine-removal.jpg";
import legsIcon from "../../../../assets/img/png/legs-icon.png";
import printIcon from "../../../../assets/img/png/print-icon.png";
import timerIcon from "../../../../assets/img/jpeg/timer.jpg";
import timerDelIcon from "../../../../assets/img/jpeg/timerDel.jpg";
import apuIcon from "../../../../assets/img/png/apu.png";
import lgIcon from "../../../../assets/img/jpeg/lg.png";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { createRef, useRef, useState } from "react";
import FileWidget from "../../../../common/FileWidget/FileWidget";
import classNames from "classnames";


const AircraftFile = () => {
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const installedEngines = useSelector((state: RootState) => state.aircraft.installedEngines);
    const apu = aircraft.apu;
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);
    const date = new Date().toISOString().slice(0, 10);


    const engines = () => sortEngines(installedEngines).map((engine: IEngine) => (
        <div key={engine.msn} className={s.engine}>
            <div className={s.span__block} >
                <span>{engine.type}</span>
            </div>
            <div className={s.span__block} >
                <span>{engine.manuf}</span>
            </div>
            <div className={s.span__block} >
                <span>{engine.position}</span>
            </div>
            <div className={s.span__block} >
                <span>{engine.msn}</span>
            </div>
            <div className={s.span__block} >
                <span>{engine.tsn}</span>
            </div>
            <div className={s.span__block} >
                <span>{engine.csn}</span>
            </div>
            <div className={s.span__block} >
                <span>{engine.lastOverhaulDate}</span>
            </div>
            <div className={s.span__block} >
                <span>{subtractFH(engine.tsn, engine.tsnAtLastOverhaul)}</span>
            </div>
            <div className={s.span__block} >
                <span>{subtractFC(engine.csn, engine.csnAtLastOverhaul)}</span>
            </div>
        </div>

    ))

    const arr = aircraft.limits;

    const sorted = arr.slice().sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    const limits = () => sorted.map((limit: ILimit, pos: number) => {
        return (
            <Limit aircraft={aircraft} pos={pos} limit={limit} />
        )
    }
    )

    const gears = () => aircraft.lgs.map((gear: ILg) => {
        console.log(gear)
        return (
            <div key={gear.sn} className={s.gear}>
                <div className={s.span__block} >
                    <span>{gear.pos}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.pn}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.sn}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.lastInspDate}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.tsnAtLastInsp}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.csnAtLastInsp}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.nextInspDate}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.tsnAtNextInsp ? gear.tsnAtNextInsp : '-'}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.csnAtNextInsp ? gear.csnAtNextInsp : '-'}</span>
                </div>
                <div className={s.span__block} >
                    <span>{subtractDatesFromNow(gear.nextInspDate)}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.tsnAtNextInsp ? subtractFH(gear.tsn, gear.tsnAtNextInsp) : '-'}</span>
                </div>
                <div className={s.span__block} >
                    <span>{gear.csnAtNextInsp ? subtractFC(gear.csn, gear.csnAtNextInsp) : '-'}</span>
                </div>
            </div>
        )
    })

    return (
        <div className={s.aircraftFile} >
            <h1 className={s.aircraftFile__header} >AIRCRAFT DATA SHEET {aircraft.msn}</h1>
            <div className={s.aircraftFile__container} >
                <div ref={componentRef} className={s.info__container}>
                    <div className={s.info}>
                        <div className={s.data__section}>
                            <div className={s.data__section__block} >
                                <div className={s.label__block}>
                                    <label>Date as:</label>
                                </div>
                                <div className={s.span__block} >
                                    <span>{date}</span>
                                </div>
                            </div>
                            <div className={s.data__section__block} >
                                <div className={s.label__block}>
                                    <label>Flight Hours:</label>
                                </div>
                                <div className={s.span__block} >
                                    <span>{aircraft.fh}</span>
                                </div>
                            </div>
                            <div className={s.data__section__block} >
                                <div className={s.label__block}>
                                    <label>Flight Cycles:</label>
                                </div>
                                <div className={s.span__block} >
                                    <span>{aircraft.fc}</span>
                                </div>
                            </div>
                        </div>

                        <div className={s.info__section}>
                            <div className={s.section__block}>
                                <h3 className={s.section__block__header}>A. AIRCRAFT </h3>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Registration number:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.regNum}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Aircraft model:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.type}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Aircraft Type Certificate №:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.typeCert}</span>
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
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Serial number:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.msn}</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Effectivity Code:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.code}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={s.section__block}>
                                <h3 className={s.section__block__header}>B. PERFORMANCE DATA </h3>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Max. Take-Off Cross Weight:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{lbTokg(aircraft.mtow)} KG ({aircraft.mtow} LB)</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Max. Zero Fuel Weight:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{lbTokg(aircraft.mzfw)} KG ({aircraft.mzfw} LB)</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Max. Landing Weight:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{lbTokg(aircraft.mlw)} KG ({aircraft.mlw} LB)</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Max. Taxi Weight:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{lbTokg(aircraft.mtw)} KG ({aircraft.mtw} LB)</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Fuel Capacity:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.fuelCap} L ({ltTogal(aircraft.fuelCap)} U.S.G)</span>
                                    </div>
                                </div>
                                <div className={s.info__section__block} >
                                    <div className={s.label__block}>
                                        <label>Basic Empty Weight / C.G.:</label>
                                    </div>
                                    <div className={s.span__block} >
                                        <span>{aircraft.bew} KG / {aircraft.cg} (%MAC)</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {aircraft.overhaulNum ? <div className={s.info__section}>
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
                        </div> : null}
                        <div className={s.engines__section}>
                            <h3 className={s.section__header}>C. POWERPLANT</h3>
                            <h3 className={classNames(s.section__header, s.second)}>D. APU</h3>
                            <div className={classNames(s.engine, s.title)} >
                                <div className={s.label__block}>
                                    <label>Engine model:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Manufacturer:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Position:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Serial Number:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>TSN FH:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>CSN FC:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Date last SV:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>TSLSV FH:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>CSLSV FC::</label>
                                </div>
                            </div>
                            <div className={s.engines__section__wrap}>
                                {engines()}
                            </div>

                            { aircraft.apu && <div className={classNames(s.apu)}>
                                <div className={s.span__block} >
                                    <span>{apu.type ? apu.type : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.manuf ? apu.manuf : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>APU</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.msn ? apu.msn : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.tsn ? apu.tsn : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.csn ? apu.csn : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.lastOverhaulDate ? apu.lastOverhaulDate : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.tsn ? subtractFH(apu.tsn, apu.tsnAtLastOverhaul) : 'N/A'}</span>
                                </div>
                                <div className={s.span__block} >
                                    <span>{apu.csn ? subtractFC(apu.csn, apu.csnAtLastOverhaul) : 'N/A'}</span>
                                </div>
                            </div>}
                        </div>

                        <div className={s.limits__section}>
                            <h3 className={s.section__header}>E. INSPECTIONS</h3>
                            <div className={classNames(s.limit, s.title)}>
                                <div className={s.label__block}>
                                    <label>Inspection Type:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Last Done Date:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Last Done FH:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Next Insp. Date:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Next Insp. FH:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Next Insp. FC:</label>
                                </div>

                                <div className={s.label__block}>
                                    <label>Remaining Days :</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Remaining FH :</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Remaining FC:</label>
                                </div>
                            </div>
                            <div className={s.limits__section__wrap}>
                                {limits()}
                            </div>
                        </div>
                        <div className={s.gears__section}>
                            <h3 className={s.section__header}>F. LANDING GEAR</h3>
                            <div className={classNames(s.gear, s.title)}>
                                <div className={s.label__block}>
                                    <label>Position:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Part Number:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Serial Number:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>LG Inspection:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Last Done FH:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Last Done FC:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Next Insp. Date:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Next Insp. FH:</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Next Insp. FC:</label>
                                </div>

                                <div className={s.label__block}>
                                    <label>Remaining Days :</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Remaining FH :</label>
                                </div>
                                <div className={s.label__block}>
                                    <label>Remaining FC:</label>
                                </div>
                            </div>
                            <div className={s.gears__section__wrap}>
                                {/* {limits()} */}
                                {gears()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.aircraftFile__container__buttons} >
                    <FileWidget text="Legs" img={legsIcon} handler={() => navigate(`legs`)} />
                    <ReactToPrint
                        trigger={() => <button className={s.print__btn} >
                            <FileWidget text="Print report" img={printIcon} />
                        </button>}
                        content={() => componentRef.current}
                    />
                    <FileWidget text="Install Engine" img={engineIcon} handler={() => navigate('engine/install')} />
                    <FileWidget text="Remove Engine" img={engineIcon} isMute={aircraft.engines.length ? false : true} handler={() => navigate('engine/remove')} />
                    <FileWidget text="new limit" img={timerIcon} handler={() => navigate('limit')} />
                    <FileWidget text="del limit" img={timerDelIcon} handler={() => navigate('limit/del')} />
                    <FileWidget text="Install APU" img={apuIcon} isMute={aircraft.apu?.msn ? true : false} handler={() => navigate('apu/install')} />
                    <FileWidget text="remove APU" img={apuIcon} isMute={aircraft.apu?.msn ? false : true} handler={() => navigate('apu/remove')} />
                    <FileWidget text="install LG" img={lgIcon} isMute={false} handler={() => navigate('lg/install')} />
                    <FileWidget text="remove LG" img={lgIcon} isMute={false} handler={() => navigate('lg/remove')} />
                </div>
            </div>
            <div className={s.aircraftFile__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate('/i-service/aircrafts')} />
            </div>
        </div >
    )
}


type LimitProps = {
    aircraft: IAircraft;
    limit: ILimit;
    pos: number;
}

const Limit: React.FC<LimitProps> = ({ aircraft, limit, pos }) => {
    return (
        <div key={pos} className={s.limit}  >
            <div className={s.span__block}>
                <label>{limit.title}</label>
            </div>
            <div className={s.span__block} >
                <span>{limit.lastInspDate}</span>
            </div>
            <div className={s.span__block} >
                <span>{limit.tsnAtLastInsp}</span>
            </div>
            <div className={s.span__block} >
                <span>{limit.nextInspDate.length ? limit.nextInspDate : '-'}</span>
            </div>
            <div className={s.span__block} >
                <span>{limit.tsnAtNextInsp.length ? limit.tsnAtNextInsp : '-'}</span>
            </div>
            <div className={s.span__block} >
                <span>{limit.csnAtNextInsp.length ? limit.csnAtNextInsp : '-'}</span>
            </div>
            <div className={s.span__block} >
                {/* TODO */}
                <span>{limit.nextInspDate.length ? limit.csnAtNextInsp : '-'}</span>
            </div>
            <div className={s.span__block} >
                {/* TODO */}
                <span>{limit.tsnAtNextInsp.length ? subtractFH(limit.tsnAtNextInsp, aircraft.fh) : '-'}</span>
            </div>
            <div className={s.span__block} >
                {/* TODO */}
                <span>{limit.csnAtNextInsp.length ? subtractFC(limit.csnAtNextInsp, aircraft.fc) : '-'}</span>
            </div>
        </div>
    )
}


export default AircraftFile;