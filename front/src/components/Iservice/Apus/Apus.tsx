import EmptyWidget from "../../../common/EmptyWidget/EmptyWidget";
import s from "./Apus.module.scss";

const Apus = () => {
    return (
        <div className={s.apus} >
            <EmptyWidget route={"new-apu"}  />
        </div>
    )
}

export default Apus;