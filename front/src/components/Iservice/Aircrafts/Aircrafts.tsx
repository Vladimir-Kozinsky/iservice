import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import React, { useEffect } from 'react';
import s from "./Aircrafts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAircrafts } from "../../../store/reducers/aircraftReducer/aircraftReducer";
import { IAircraft } from "../../../types/types";
import AircraftWidget from "../Dashboard/AircraftWidget/AircraftWidget";

const Aircrafts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const aircraftsArr = useSelector((state: RootState) => state.aircraft.aircafts);

    useEffect(() => {
       dispatch(getAircrafts())
    }, [])

    return (
        <div className={s.aircrafts} >
            {aircraftsArr.map((aircaft: IAircraft) => (
                <AircraftWidget key={aircaft._id} aircraft={aircaft} />
            ))}
            <EmptyWidget route={"new-aircraft"} />
        </div>
    )
}

export default Aircrafts;