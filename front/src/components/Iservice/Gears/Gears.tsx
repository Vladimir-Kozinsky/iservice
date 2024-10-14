import { useDispatch, useSelector } from "react-redux";
import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import s from "./Gears.module.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { IGear } from "../../../types/types";
import React, { useEffect } from "react";
import { getApus } from "../../../store/reducers/apuReducer/apuReducer";
import GearWidget from "./GearWidget/GearWidget";

const Gears: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
   const gearsArr = useSelector((state: RootState) => state.gear.gears);

   const gears = () => gearsArr.map((gear: IGear)=> (
    <GearWidget key={gear._id} gear={gear} />
))

useEffect(() => {
    dispatch(getApus());
}, [])

    return (
        <div className={s.apus} >
                 {gears()}
            <EmptyWidget route={"new-gear"}  />
        </div>
    )
}

export default Gears;