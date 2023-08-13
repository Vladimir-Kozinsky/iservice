import s from './AircraftWidget.module.scss';
import plane from './../../../../assets/img/png/plane-icon.png'
import engine from './../../../../assets/img/png/engine.png'
import apu from './../../../../assets/img/png/apu.png'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { IAircraft, IEngine } from '../../../../types/types';
import { type } from 'os';
import { setChoosedAircraft } from '../../../../store/reducers/aircraftReducer/aircraftReducer';
import { useNavigate } from 'react-router-dom';

type AircraftWidgetProps = {
    aircraft: IAircraft;
}

export const setEngine = (pos: number, engines: IEngine[]): string | undefined => {
    if (pos && engines.length > 0) {
        const eng = engines.find((e: IEngine) => e.position == pos);
        if (eng) return eng.msn?.toString();
    }
    return undefined;
}

const AircraftWidget: React.FC<AircraftWidgetProps> = ({ aircraft }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const widgetOnClick = async () => {
        await dispatch(setChoosedAircraft(aircraft));
        navigate(`/i-service/aircraft/${aircraft.msn}`);

    }

    const cutData = (str: string | undefined | null) => {
        if (!str) return 'N/A'
        if (str.length <= 5) return str;
        const cutStr = str.slice(str.length - 3, str.length)
        return `...${cutStr}`;
    }

    return (
        <>
            <div className={s.widget} onClick={widgetOnClick} >
                <img className={s.widget__plane} src={plane} alt="plane-icon" />
                <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{`Type: ${aircraft?.type}`}</h3>
                    <h3 className={s.widget__data__value}>{`MSN: ${aircraft?.msn}`}</h3>
                </div>

                <div className={s.widget__data__engines}>
                    <div className={s.engine}>
                        <img src={engine} alt="engine-icon" />
                        {aircraft
                            ? <span>{`1: ${cutData(setEngine(1, aircraft.engines))}`}</span>
                            : <span>{`1: N/A`}</span>}
                    </div>
                    <div className={s.engine}>
                        <img src={engine} alt="engine-icon" />
                        {aircraft
                            ? <span>{`2: ${cutData(setEngine(2, aircraft.engines))}`}</span>
                            : <span>{`2: N/A`}</span>}
                    </div>
                    <div className={s.engine}>
                        <img src={engine} alt="engine-icon" />
                        {aircraft
                            ? <span>{`3: ${cutData(setEngine(3, aircraft.engines))}`}</span>
                            : <span>{`3: N/A`}</span>}
                    </div>
                    <div className={s.engine}>
                        <img src={engine} alt="engine-icon" />
                        {aircraft
                            ? <span>{`4: ${cutData(setEngine(4, aircraft.engines))}`}</span>
                            : <span>{`4: N/A`}</span>}
                    </div>
                    <div className={s.engine}>
                        <img src={apu} alt="engine-icon" />
                        <span>{`${cutData(aircraft.apu.msn)}`}</span>
                    </div>
                </div >

            </div>
        </>

    )
}

export default AircraftWidget;