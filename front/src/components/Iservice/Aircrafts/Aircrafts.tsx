import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import s from "./Aircrafts.module.scss";

const Aircrafts = () => {
    return (
        <div className={s.aircrafts} >
            <EmptyWidget route={"new-aircraft"} />
        </div>
    )
}

export default Aircrafts;