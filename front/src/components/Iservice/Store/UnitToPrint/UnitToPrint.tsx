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
            <span className={classNames(s.unit__title, s.unit__ata)} >{unit.ata}</span>
            <span className={classNames(s.unit__title, s.unit__pn)} >{unit.pn}</span>
            <span className={classNames(s.unit__title, s.unit__sn)}>{unit.sn}</span>
            <span className={classNames(s.unit__title, s.unit__type)} >{unit.type}</span>
            <span className={classNames(s.unit__title, s.unit__desc)}>{unit.desc}</span>
            <span className={classNames(s.unit__title, s.unit__grn)}>{cutText(12, unit.grn)}</span>
            <span className={classNames(s.unit__title, s.unit__quantity)}>{unit.quantity}</span>
            <span className={classNames(s.unit__title, s.unit__eapack)}>{unit.eapack}</span>
            <span className={classNames(s.unit__title, s.unit__location)}>{unit.location}</span>
            <span className={classNames(s.unit__title, s.unit__rack)}>{unit.rack}</span>
            <span className={classNames(s.unit__title, s.unit__shelf)}>{unit.shelf}</span>
            <span className={classNames(s.unit__title, s.unit__condition)}>{unit.condition}</span>
            <span className={classNames(s.unit__title, s.unit__lifelimit)}>{unit.lifelimit}</span>
            <span className={classNames(s.unit__title, s.unit__shelflife)}>{unit.shelflife}</span>
            <span className={classNames(s.unit__title, s.unit__remarks)}>{unit.remarks}</span>
        </div>
    )
}

export default UnitToPrint;
