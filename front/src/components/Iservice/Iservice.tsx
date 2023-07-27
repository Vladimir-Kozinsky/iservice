import React from "react";
import s from './IService.module.scss'
import { compose } from "@reduxjs/toolkit";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile/Profile";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import Aircrafts from "./Aircrafts/Aircrafts";
import Engines from "./Engines/Engines";
import Apus from "./Apus/Apus";
import AircraftFile from "./Aircrafts/AircraftFile/AircraftFile";
import NewAircraftForm from "./Aircrafts/NewAircraftForm/NewAircraftForm";
import NewEngineForm from "./Engines/NewEngineForm/NewEngineForm";
import Legs from "./Aircrafts/Legs/Legs";
import NewLimit from "./Aircrafts/AircraftFile/NewLimit/NewLimit";
import DelLimit from "./Aircrafts/AircraftFile/DelLimit/DelLimit";
import SignUp from "../SignUp/SignUp";
import InstallEngine from "./Aircrafts/AircraftFile/InstallEngine/InstallEngine";


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
                        <NavLink className={s.nav_container_link} to="/i-service">Dashboard</NavLink>
                        <NavLink className={s.nav_container_link} to="aircrafts">Aircrafts</NavLink>
                        <NavLink className={s.nav_container_link} to="engines">Engines</NavLink>
                        <NavLink className={s.nav_container_link} to="apus">APUs</NavLink>
                    </div>
                </nav>
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="aircrafts" element={<Aircrafts />} />
                    <Route path="apus" element={<Apus />} />
                    <Route path="aircrafts/new-aircraft" element={<NewAircraftForm />} />
                    <Route path="engines/new-engine" element={<NewEngineForm />} />
                    <Route path="aircraft/:aircraftId" element={<AircraftFile />} />
                    <Route path="aircraft/:aircraftId/legs" element={<Legs />} />
                    <Route path="aircraft/:aircraftId/limit" element={<NewLimit />} />
                    <Route path="aircraft/:aircraftId/limit/del" element={<DelLimit />} />
                    <Route path="aircraft/:aircraftId/engine/install" element={<InstallEngine />} />

                    <Route path="engines" element={<Engines />} />
                    
                </Routes>
            </main>
            <Footer theme="light" />
        </div>
    )
}

export default compose(withAuthRedirect)(Iservice);