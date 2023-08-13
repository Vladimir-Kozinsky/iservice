import s from './ApuWidget.module.scss';
import apuIcon from './../../../../assets/img/png/apu.png'
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { IApu } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';
import { setChoosedApu } from '../../../../store/reducers/apuReducer/apuReducer';

type ApuWidgetProps = {
    apu: IApu;
}

const ApuWidget: React.FC<ApuWidgetProps> = ({ apu }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const widgetOnClick = async () => {
        await dispatch(setChoosedApu(apu));
        navigate(`/i-service/apu/${apu.msn}`);
    }

    return (
        <>
            <div className={s.widget} onClick={widgetOnClick} >
                <img className={s.widget__img} src={apuIcon} alt="apu-icon" />
                <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{`Type: ${apu.type}`}</h3>
                    <h3 className={s.widget__data__value}>{`MSN: ${apu.msn}`}</h3>
                </div>
            </div>
        </>
    )
}

export default ApuWidget;