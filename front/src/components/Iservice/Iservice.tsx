import React from "react";
import s from './IService.module.scss'
import { compose } from "@reduxjs/toolkit";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile/Profile";
import Footer from "../Footer/Footer";
import SignUp from "../SignUp/SignUp";
import Store from "./Store/Store";
import Tools from "./Tool/Tools";


const Iservice: React.FC = () => {
    return (
        <div className={s.container}>
            <div className={s.container__content__back}></div>
            <div className={s.container__content__back2}></div>
            <Header theme="white" />
            <main className={s.main}>
                {/* <nav className={s.nav} >
                    <div className={s.nav_container}> */}
                {/* <NavLink className={s.nav_container_link} to="profile">Profile</NavLink> */}
                {/* <NavLink className={s.nav_container_link} to="/i-service">Dashboard</NavLink> */}
                {/* <div className={s.block}>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? classNames(s.nav_container_link, s.active) : s.nav_container_link
                            } to="aircrafts">Aircrafts</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? classNames(s.nav_container_link, s.active) : s.nav_container_link
                            } to="engines">Engines</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? classNames(s.nav_container_link, s.active) : s.nav_container_link
                            } to="apus">APUs</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? classNames(s.nav_container_link, s.active) : s.nav_container_link
                            } to="gears">Landing Gears</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? classNames(s.nav_container_link, s.active) : s.nav_container_link
                            } to="store">Store</NavLink>
                        </div> */}
                {/* </div>
                </nav> */}
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    {/* <Route path="signup" element={<SignUp />} /> */}
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    {/* <Route path="aircrafts" element={<Aircrafts />} />
                    <Route path="aircrafts/new-aircraft" element={<NewAircraftForm />} />
                    <Route path="aircraft/:aircraftId" element={<AircraftFile />} />
                    <Route path="aircraft/:aircraftId/legs" element={<Legs />} />
                    <Route path="aircraft/:aircraftId/limit" element={<NewLimit />} />
                    <Route path="aircraft/:aircraftId/limit/del" element={<DelLimit />} />
                    <Route path="aircraft/:aircraftId/engine/install" element={<InstallEngine />} />
                    <Route path="aircraft/:aircraftId/engine/remove" element={<RemoveEngine />} />
                    <Route path="aircraft/:aircraftId/apu/install" element={<InstallApu />} />
                    <Route path="aircraft/:aircraftId/apu/remove" element={<RemoveApu />} />
                    <Route path="aircraft/:aircraftId/lg/install" element={<InstallGear />} />
                    <Route path="aircraft/:aircraftId/lg/remove" element={<RemoveGear />} />
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

                    <Route path="gears" element={<Gears />} />
                    <Route path="gears/new-gear" element={<NewGearForm />} />
                    <Route path="gear/:gearId" element={<GearFile />} />
                    <Route path="gear/:gearId/limit" element={<NewGearLimit />} /> */}
                    <Route path="/" element={<Store />} />
                    <Route path="tools" element={<Tools />} />
                </Routes>
            </main>
            <Footer theme="light" />
        </div>
    )
}

export default compose(withAuthRedirect)(Iservice);