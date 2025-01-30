import s from './GearWidget.module.scss';
import gearIcon from './../../../../assets/img/png/gear.png';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { IGear } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';
import { setChoosedGear } from '../../../../store/reducers/gearReducer/gearReducer';

type GearWidgetProps = {
    gear: IGear;
}

const GearWidget: React.FC<GearWidgetProps> = ({ gear }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const widgetOnClick = async () => {
        await dispatch(setChoosedGear(gear));
        navigate(`/i-service/gear/${gear.sn}`);
    }

    return (
        <>
            <div className={s.widget} onClick={widgetOnClick} >
                <img className={s.widget__img} src={gearIcon} alt="gear-icon" />
                <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{`Type: ${gear.pos}`}</h3>
                    <h3 className={s.widget__data__value}>{`MSN: ${gear.sn}`}</h3>
                </div>
            </div>
        </>
    )
}

export default GearWidget;