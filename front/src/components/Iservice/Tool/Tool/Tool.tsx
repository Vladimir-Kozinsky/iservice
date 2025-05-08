import classNames from "classnames"
import { ITool, IUnit } from "../../../../types/types"
import s from "./Tool.module.scss"
import { useState } from "react"
import settIcon from "../../../../assets/img/png/setting_icon.png"
import DeleteMessage from "../../../../common/messages/DeleteMessage/DeleteMessage"
import { deleteUnit } from "../../../../store/reducers/storeReducer/storeReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../store/store"
import { deleteTool } from "../../../../store/reducers/toolReducer/toolReducer"


type ToolPropsType = {
    tool: ITool
    editHandler: (tool: ITool) => void
}



const Unit: React.FC<ToolPropsType> = ({ tool, editHandler }) => {
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
        await dispatch(deleteTool({ id: tool._id }));
        setIsLoader(false);
    }

    return (
        <div className={s.tool} >
            {delMess && <DeleteMessage handleBack={() => setDelMess(false)}
                handleSubmit={deleteUnitHandler}
                header='Would you like to delete this unit?'
                text='The unit will be permanently deleted'
            />}
            <span title={tool.pn} className={classNames(s.tool__title, s.tool__pn)} >{tool.pn}</span>
            <span title={tool.sn} className={classNames(s.tool__title, s.tool__sn)}>{tool.sn}</span>
            <span className={classNames(s.tool__title, s.tool__type)} >{tool.type}</span>
            <span title={tool.desc} className={classNames(s.tool__title, s.tool__desc)}>{tool.desc}</span>
            <span className={classNames(s.tool__title, s.tool__quantity)}>{tool.quantity}</span>
            <span className={classNames(s.tool__title, s.tool__location)}>{tool.location}</span>
            <span className={classNames(s.tool__title, s.tool__rack)}>{tool.rack}</span>
            <span className={classNames(s.tool__title, s.tool__shelf)}>{tool.shelf}</span>
            <span className={classNames(s.tool__title, s.tool__calibration)}>{tool.calibration}</span>
            <span className={classNames(s.tool__title, s.tool__remarks)}>{tool.remarks}</span>
            <button className={s.tool__button} onClick={menuHandler} ><img src={settIcon} alt="icon" /></button>
            <div onMouseLeave={onMouseLeave} className={classNames(s.tool__menu, menu ? s.tool__menu__active : '')}>
                <button onClick={() => editHandler(tool)} className={s.tool__menu__button} >Edit</button>
                <button onClick={() => setDelMess(true)} className={s.tool__menu__button} >Delete</button>
            </div>
        </div>
    )
}

export default Unit;
