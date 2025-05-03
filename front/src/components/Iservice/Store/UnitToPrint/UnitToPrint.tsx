import classNames from "classnames"
import { IUnit } from "../../../../types/types"
import s from "./UnitToPrint.module.scss"
import { cutText } from "../../../../utils/utils"
import { useState } from "react"
import settIcon from "../../../../assets/img/png/setting_icon.png"
import DeleteMessage from "../../../../common/messages/DeleteMessage/DeleteMessage"
import { deleteUnit } from "../../../../store/reducers/storeReducer/storeReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../store/store"


type UnitPropsType = {
    unit: IUnit
}

const UnitToPrint: React.FC<UnitPropsType> = ({ unit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);

    return (
        <div className={s.unit} >
            <span className={s.unit__title} >{unit.ata}</span>
            <span className={s.unit__title} >{unit.pn}</span>
            <span className={s.unit__title}>{unit.sn}</span>
            <span className={s.unit__title} >{unit.type}</span>
            <span className={classNames(s.unit__title, s.title__wide)}>{unit.desc}</span>
            <a className={s.unit__title}>{cutText(12, unit.grn)}</a>
            <span className={classNames(s.unit__title, s.title__narrow)}>{unit.quantity}</span>
            <span className={classNames(s.unit__title, s.title__narrow)}>{unit.eapack}</span>
            <span className={s.unit__title}>{unit.location}</span>
            <span className={classNames(s.unit__title, s.title__narrow)}>{unit.rack}</span>
            <span className={classNames(s.unit__title, s.title__narrow)}>{unit.shelf}</span>
            <span className={s.unit__title}>{unit.condition}</span>
            <span className={s.unit__title}>{unit.lifelimit}</span>
            <span className={s.unit__title}>{unit.shelflife}</span>
            <span className={classNames(s.unit__title, s.title__wide)}>{unit.remarks}</span>
        </div>
    )
}

export default UnitToPrint;
