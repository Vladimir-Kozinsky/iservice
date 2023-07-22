import React, { useEffect } from "react";
import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import s from "./Engines.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getEngines } from "../../../store/reducers/engineReducer/engineReducer";
import { IEngine } from "../../../types/types";
import EngineWidget from "./EngineWidget/EngineWidget";

const Engines: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const enginessArr = useSelector((state: RootState) => state.engine.engines);

    const engines = () => enginessArr.map((engine: IEngine)=> (
        <EngineWidget key={engine._id} engine={engine} />
    ))

    useEffect(() => {
        dispatch(getEngines());
    }, [])

    return (
        <div className={s.engines} >
            {engines()}
            <EmptyWidget route={"new-engine"}  />
        </div>
    )
}

export default Engines;