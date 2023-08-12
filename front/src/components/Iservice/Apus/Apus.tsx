import { useDispatch, useSelector } from "react-redux";
import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import s from "./Apus.module.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { IApu } from "../../../types/types";
import React, { useEffect } from "react";
import { getApus } from "../../../store/reducers/apuReducer/apuReducer";
import ApuWidget from "./ApuWidget/ApuWidget";

const Apus: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
   const apusArr = useSelector((state: RootState) => state.apu.apus);

   const apus = () => apusArr.map((apu: IApu)=> (
    <ApuWidget key={apu._id} apu={apu} />
))

useEffect(() => {
    dispatch(getApus());
}, [])

    return (
        <div className={s.apus} >
                 {apus()}
            <EmptyWidget route={"new-apu"}  />
        </div>
    )
}

export default Apus;