import classNames from "classnames"
import { IUnit } from "../../../../types/types"
import s from "./Unit.module.scss"
import { cutText } from "../../../../utils/utils"
import { useState } from "react"
import settIcon from "../../../../assets/img/png/setting_icon.png"
import DeleteMessage from "../../../../common/messages/DeleteMessage/DeleteMessage"
import { deleteUnit } from "../../../../store/reducers/storeReducer/storeReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../store/store"


type UnitPropsType = {
    unit: IUnit
    editHandler: (unit: IUnit) => void
    usageHandler: (unit: IUnit) => void
    historyHandler: (unit: IUnit) => void
}



const Unit: React.FC<UnitPropsType> = ({ unit, editHandler, usageHandler, historyHandler }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [menu, setMenu] = useState(false);
    const [delMess, setDelMess] = useState(false);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);

    const menuHandler = () => {
        if (menu) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    }

    const onMouseLeave = () => {
        setMenu(false);
    }

    const deleteUnitHandler = async () => {
        setIsLoader(true);
        await dispatch(deleteUnit({ id: unit._id }));
        setIsLoader(false);
    }

    return (
        <div className={s.unit} >
            {delMess && <DeleteMessage handleBack={() => setDelMess(false)}
                handleSubmit={deleteUnitHandler}
                header='Would you like to delete this unit?'
                text='The unit will be permanently deleted'
            />}
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
            <button className={s.unit__button} onClick={menuHandler} ><img src={settIcon} alt="icon" /></button>
            <div onMouseLeave={onMouseLeave} className={classNames(s.unit__menu, menu ? s.unit__menu__active : '')}>
                <button onClick={() => usageHandler(unit)} className={s.unit__menu__button} >Usage</button>
                <button onClick={() => editHandler(unit)} className={s.unit__menu__button} >Edit</button>
                <button onClick={() => historyHandler(unit)} className={s.unit__menu__button} >History</button>
                <button onClick={() => setDelMess(true)} className={s.unit__menu__button} >Delete</button>
            </div>
        </div>
    )
}

export default Unit;
