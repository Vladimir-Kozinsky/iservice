import s from "./EmptyWidget.module.scss";
import React from 'react';
import cross from "../../assets/img/png/cross.png";
import { useNavigate } from "react-router-dom";

type EmptyWidgetPropsType = {
    route: string;
}

const EmptyWidget: React.FC<EmptyWidgetPropsType> = ({ route }) => {
    const navigate = useNavigate();
    return (
        <div className={s.emptyWidget} onClick={() => navigate(route)} >
            <div className={s.emptyWidget__btns} >
            </div>
            <img className={s.emptyWidget__cross__img} src={cross} alt="cross-icon" />
        </div>
    )
}

export default EmptyWidget;