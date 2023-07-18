import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import s from "./Engines.module.scss";

const Engines = () => {
    return (
        <div className={s.engines} >
            <EmptyWidget route={"new-engine"}  />
        </div>
    )
}

export default Engines;