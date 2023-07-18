import { useNavigate } from "react-router-dom";
import s from "./DashboardWidget.module.scss";
import React from 'react';

type DashboardWidgetPropsType = {
    img: string;
    route: string;
}

const DashboardWidget: React.FC<DashboardWidgetPropsType> = ({ img, route }) => {
    const navigate = useNavigate();
    return (
        <div className={s.dashboardWidget} onClick={() => navigate(route)} >
            <img className={s.dashboardWidget__img} src={img} alt="widget_img" />
        </div>
    )
}

export default DashboardWidget;