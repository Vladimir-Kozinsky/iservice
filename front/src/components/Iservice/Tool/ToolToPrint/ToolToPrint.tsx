import classNames from "classnames"
import { ITool, IUnit } from "../../../../types/types"
import s from "./ToolToPrint.module.scss"


type ToolPropsType = {
    tool: ITool;
}

const ToolToPrint: React.FC<ToolPropsType> = ({ tool }) => {

    return (
        <div className={s.tool} >
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
        </div>
    )
}

export default ToolToPrint;
