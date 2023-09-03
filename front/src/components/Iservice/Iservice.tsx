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
import RemoveEngine from "./Aircrafts/AircraftFile/RemoveEngine/RemoveEngine";
import NewLeg from "./Aircrafts/Legs/NewLeg/NewLeg";
import PrintLegs from "./Aircrafts/Legs/PrintLegs/PrintLegs";
import EngineFile from "./Engines/EngineFile/EngineFile";
import NewEngineLimit from "./Engines/EngineFile/NewEngineLimit/NewEngineLimit";
import DelEngineLimit from "./Engines/EngineFile/DelEngineLimit/DelEngineLimit";
import PrintEngineReport from "./Engines/EngineFile/PrintEngineReport/PrintEngineReport";
import ApuFile from "./Apus/ApuFile/ApuFile";
import InstallApu from "./Aircrafts/AircraftFile/InstallApu/InstallApu";
import RemoveApu from "./Aircrafts/AircraftFile/RemoveApu/RemoveApu";
import NewApuForm from "./Apus/NewApuForm/NewApuForm";
import NewApuLimit from "./Apus/ApuFile/NewApuLimit/NewApuLimit";
import DelApuLimit from "./Apus/ApuFile/DelApuLimit/DelApuLimit";


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
                    <Route path="aircrafts/new-aircraft" element={<NewAircraftForm />} />
                    <Route path="aircraft/:aircraftId" element={<AircraftFile />} />
                    <Route path="aircraft/:aircraftId/legs" element={<Legs />} />
                    <Route path="aircraft/:aircraftId/limit" element={<NewLimit />} />
                    <Route path="aircraft/:aircraftId/limit/del" element={<DelLimit />} />
                    <Route path="aircraft/:aircraftId/engine/install" element={<InstallEngine />} />
                    <Route path="aircraft/:aircraftId/engine/remove" element={<RemoveEngine />} />
                    <Route path="aircraft/:aircraftId/apu/install" element={<InstallApu />} />
                    <Route path="aircraft/:aircraftId/apu/remove" element={<RemoveApu />} />
                    <Route path="aircraft/:aircraftId/legs/create" element={<NewLeg />} />
                    <Route path="aircraft/:aircraftId/legs/print" element={<PrintLegs />} />

                    <Route path="engines" element={<Engines />} />
                    <Route path="engines/new-engine" element={<NewEngineForm />} />
                    <Route path="engine/:engineId" element={<EngineFile />} />
                    <Route path="engine/:engineId/limit" element={<NewEngineLimit />} />
                    <Route path="engine/:engineId/limit/del" element={<DelEngineLimit />} />
                    <Route path="engine/:engineId/report" element={<PrintEngineReport />} />

                    <Route path="apus" element={<Apus />} />   
                    <Route path="apus/new-apu" element={<NewApuForm />} />                
                    <Route path="apu/:apuId" element={<ApuFile />} />
                    <Route path="apu/:apuId/limit" element={<NewApuLimit />} />
                    <Route path="apu/:apuId/limit/del" element={<DelApuLimit />} />
                </Routes>
            </main>
            <Footer theme="light" />
        </div>
    )
}

export default compose(withAuthRedirect)(Iservice);