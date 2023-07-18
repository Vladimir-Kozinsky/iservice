import React from "react";
import s from './IService.module.scss'
import { compose } from "@reduxjs/toolkit";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile/Profile";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "../Footer/Footer";


const Iservice: React.FC = () => {
    return (
        <div className={s.iservice}>
            <div className={s.iservice__content__back}></div>
            <div className={s.iservice__content__back2}></div>
            <Header theme="white" />
            <main className={s.main}>
                <nav className={s.nav} >
                    <div className={s.nav_container}>
                        <NavLink className={s.nav_container_link} to="profile">Profile</NavLink>
                        <NavLink className={s.nav_container_link} to="dashboard">Dashboard</NavLink>
                    </div>
                </nav>
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </main>
            <Footer theme="light" />
        </div>
    )
}

export default compose(withAuthRedirect)(Iservice);