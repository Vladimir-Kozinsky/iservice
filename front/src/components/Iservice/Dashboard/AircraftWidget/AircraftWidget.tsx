import s from './AircraftWidget.module.scss';
import plane from './../../../../assets/img/png/plane.png'
import engine from './../../../../assets/img/png/engine.png'
import apu from './../../../../assets/img/png/apu.png'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';

type propsAircraftWidget = {
    onClick?: any;
    aircraft?: any;
}

const AircraftWidget = ({ onClick, aircraft }: propsAircraftWidget) => {
    const dispatch = useDispatch<AppDispatch>();
    const cutData = (str: string | undefined) => {
        if (!str) return 'N/A'
        if (str.length <= 5) return str;
        const cutStr = str.slice(str.length - 3, str.length)
        return `...${cutStr}`;
    }
    const [arcraftFile, setArcraftFile] = useState(false);

   

    const widgetOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        if (aircraft && onClick && target.tagName !== "BUTTON") {
            setArcraftFile(true);
           // dispatch(setChoosedAircraft(aircraft))
        }
    }

    return (
        <>
            <div className={s.widget} onClick={widgetOnClick} >
                <div className={s.widget__btns} >
                    <button className={s.widget__btns__set} onClick={()=> console.log('show')} >
                    </button>
                </div>
                <img className={s.widget__plane__img} src={plane} alt="plane-icon" />
                <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{`Type: ${aircraft?.type}`}</h3>
                    <h3 className={s.widget__data__value}>{`MSN: ${aircraft?.msn}`}</h3>
                    <div className={s.widget__data__engines}>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#1: ${cutData(aircraft?.engines[0].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#2: ${cutData(aircraft?.engines[1].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#3: ${cutData(aircraft?.engines[2].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#4: ${cutData(aircraft?.engines[3].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={apu} alt="engine-icon" />
                            <span>{`APU: ${cutData(aircraft?.apu)}`}</span>
                        </div>
                    </div >
                </div>
            </div>
        </>

    )
}

export default AircraftWidget;