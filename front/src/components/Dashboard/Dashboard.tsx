import React from "react";
import s from './Dashboard.module.scss'
import HeaderMain from "../Main/HeaderMain/HeaderMain";
import Header from "../Header/Header";

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

export default Dashboard;