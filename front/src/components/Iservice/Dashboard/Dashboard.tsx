import React from "react";
import s from './Dashboard.module.scss'
import { compose } from "@reduxjs/toolkit";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div className={s.dashboard}>
            Dashboard componentsssssssssssssssssssssssssssssssssssssssss
        </div>
    )
}

export default compose(withAuthRedirect)(Dashboard);