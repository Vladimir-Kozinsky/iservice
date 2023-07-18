import React from "react";
import s from './Dashboard.module.scss';
import { compose } from "@reduxjs/toolkit";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import DashboardWidget from "./DashboardWidget/DashboardWidget";
import plane from "../../../assets/img/png/plane-icon.png";
import engine from "../../../assets/img/png/engine-icon.png";
import apu from "../../../assets/img/png/apu.png";

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div className={s.dashboard}>
            <DashboardWidget img={plane} route="aircrafts" />
            <DashboardWidget img={engine} route="engines" />
            <DashboardWidget img={apu} route="apus" />

        </div>
    )
}

export default compose(withAuthRedirect)(Dashboard);