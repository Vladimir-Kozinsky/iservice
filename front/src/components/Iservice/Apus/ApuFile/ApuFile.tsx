import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import s from "./ApuFile.module.scss";
import FileWidget from "../../../../common/FileWidget/FileWidget";
import printIcon from "../../../../assets/img/png/print-icon.png";
import timerIcon from "../../../../assets/img/jpeg/timer.jpg";
import timerDelIcon from "../../../../assets/img/jpeg/timerDel.jpg";
import Button from "../../../../common/buttons/Button";
import ApuInfoSection from "./ApuInfoSection/ApuInfoSection";
import ApuOverhaulSection from "./ApuOverhaulSection/ApuOverhaulSection";
import LimitSection from "../../../../common/LImitSection/LimitSection";
import ApuHistorySection from "./ApuHistory/ApuHistorySection";

const ApuFile: React.FC = () => {
    const apu = useSelector((state: RootState) => state.apu.choosedApu);
    const navigate = useNavigate();

    return (
        <div className={s.apuFile} >
            <h1 className={s.apuFile__header} >APU File of {apu.msn}</h1>
            <div className={s.apuFile__container} >
                <div className={s.info__container}>
                    <div className={s.info}>
                        <ApuInfoSection apu={apu} />
                        <ApuOverhaulSection apu={apu} />
                        <LimitSection engine={apu} />
                        <ApuHistorySection apu={apu} />
                    </div>
                </div>
                <div className={s.apuFile__container__buttons} >
                    <FileWidget text="Print report" img={printIcon} handler={() => navigate('report')} />
                    <FileWidget text="new limit" img={timerIcon} handler={() => navigate('limit')} />
                    <FileWidget text="del limit" img={timerDelIcon} handler={() => navigate('limit/del')} />
                </div>
            </div>
            <div className={s.apuFile__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate('/i-service/apus')} />
            </div>
        </div>
    )
}

export default ApuFile;