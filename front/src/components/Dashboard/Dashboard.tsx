import React from "react";
import s from './Dashboard.module.scss'
import HeaderMain from "../Main/HeaderMain/HeaderMain";
import Header from "../Header/Header";
import { compose } from "@reduxjs/toolkit";
import { withAuthRedirect } from "../HOC/withAuthRedirect";

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div className={s.dashboard}>
            <div className={s.dashboard__content__back}></div>
            <div className={s.dashboard__content__back2}></div>
            <Header theme="white" />
            <main className={s.main}>

            </main>
        </div>
    )
}

export default compose(withAuthRedirect)(Dashboard);