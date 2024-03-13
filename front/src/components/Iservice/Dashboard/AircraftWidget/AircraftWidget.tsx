import s from './AircraftWidget.module.scss';
import plane from './../../../../assets/img/png/plane-icon.png'
import engineIcon from './../../../../assets/img/png/engine.png'
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
                    {aircraft.engines.map((engine: IEngine, pos: number) => (
                        < div className={s.engine}>
                            <img src={engineIcon} alt="engine-icon" />
                            <span>{`${pos + 1}: ${cutData(setEngine(pos + 1, aircraft.engines))}`}</span>
                        </div>
                    ))}
                </div >
                <div className={s.engine}>
                    <img src={apu} alt="engine-icon" />
                    {aircraft.apu
                        ? <span>{`${cutData(aircraft.apu.msn)}`}</span>
                        : <span>None</span>}
                </div>

            </div >
        </>

    )
}

export default AircraftWidget;