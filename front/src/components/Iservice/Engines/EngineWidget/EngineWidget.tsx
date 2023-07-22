import s from './EngineWidget.module.scss';
import engineIcon from './../../../../assets/img/png/engine-icon.png'
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { IEngine } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';
import { setChoosedEngine } from '../../../../store/reducers/engineReducer/engineReducer';

type EngineWidgetProps = {
    engine: IEngine;
}

const EngineWidget: React.FC<EngineWidgetProps> = ({ engine }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const widgetOnClick = async () => {
        await dispatch(setChoosedEngine(engine));
        navigate(`/i-service/engine/${engine.msn}`);
    }

    return (
        <>
            <div className={s.widget} onClick={widgetOnClick} >
                <img className={s.widget__engine} src={engineIcon} alt="plane-icon" />
                <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{`Type: ${engine?.type}`}</h3>
                    <h3 className={s.widget__data__value}>{`MSN: ${engine?.msn}`}</h3>
                </div>
                
            </div>
        </>
    )
}

export default EngineWidget;